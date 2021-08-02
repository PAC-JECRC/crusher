import { Container, Inject, Service } from "typedi";
import { DBManager } from "@modules/db";
import { TestInstanceResultSet } from "../interfaces/db/TestInstanceResultSet";
import TestInstanceResultsService from "./TestInstanceResultsService";
import { TestInstanceResultStatus } from "../interfaces/TestInstanceResultStatus";
import { TestInstanceResultSetConclusion } from "../interfaces/TestInstanceResultSetConclusion";
import { TestInstanceResult } from "../interfaces/db/TestInstanceResult";
import { TestInstanceResultSetStatus } from "../interfaces/TestInstanceResultSetStatus";
import JobReportServiceV2 from "./v2/JobReportServiceV2";

@Service()
export default class TestInstanceResultSetsService {
	private dbManager: DBManager;

	@Inject()
	private jobReportService: JobReportServiceV2;

	constructor() {
		this.dbManager = Container.get(DBManager);
	}

	async getResultsOfInstanceSet(setId: number): Promise<Array<TestInstanceResult>> {
		return this.dbManager.fetchAllRows(`SELECT * FROM test_instance_results WHERE instance_result_set_id = ?`, [setId]);
	}

	async createResultSet(details: TestInstanceResultSet) {
		return this.dbManager.insert(`INSERT INTO test_instance_result_sets SET ?`, details);
	}

	async getResultSetsBetweenTwoJobs(baseJobId: number, referenceJobId: number) {
		return this.dbManager.fetchAllRows(`SELECT * FROM test_instance_result_sets WHERE job_id = ? AND target_job_id = ?`, [baseJobId, referenceJobId]);
	}

	async getResultSets(reportId: number) {
		return this.dbManager.fetchAllRows(`SELECT * FROM test_instance_result_sets WHERE report_id = ? `, [reportId]);
	}

	async getResultSetStatusBetweenTwoJobs(
		baseJobId: number,
		referenceJobId: number,
	): Promise<{
		passedCount: number;
		failedCount: number;
		manualReviewCount: number;
	}> {
		return this.dbManager.fetchAllRows(
			`SELECT COUNT(CASE WHEN conclusion = "PASSED" THEN 1 ELSE NULL END) as passedCount, COUNT(CASE WHEN conclusion = "FAILED" THEN 1 ELSE NULL END) as failedCount, COUNT(CASE WHEN conclusion = "MANUAL_REVIEW_REQUIRED" THEN 1 ELSE NULL END) as manualReviewCount FROM test_instance_result_sets WHERE job_id = ? AND target_job_id = ?`,
			[baseJobId, referenceJobId],
		);
	}

	// This should be called everytime a result is approved/disapproved/no_action.
	async updateResultSetStatus(setId: number, reportId: number, error) {
		const results = await this.getResultsOfInstanceSet(setId);
		const passedResults = results.filter((result) => {
			return result.status == TestInstanceResultStatus.PASSED;
		});
		const failedResults = results.filter((result) => {
			return result.status == TestInstanceResultStatus.FAILED;
		});

		const hasAllTestsPassed = passedResults.length === results.length;
		const hasTestFailed = failedResults.length > 0 || !!error;
		const isStillInReview = passedResults.length + failedResults.length < results.length;

		console.log(results, results.length, hasTestFailed, hasAllTestsPassed);
		if (hasTestFailed) {
			await this.dbManager.fetchSingleRow(`UPDATE test_instance_result_sets SET status = ?, conclusion = ? WHERE id = ?`, [
				TestInstanceResultSetStatus.FINISHED_RUNNING_CHECKS,
				TestInstanceResultSetConclusion.FAILED,
				setId,
			]);
			await this.jobReportService.incrementTestStatusCount(reportId, { failed_test_count: true });
		} else if (hasAllTestsPassed) {
			await this.dbManager.fetchSingleRow(`UPDATE test_instance_result_sets SET status = ?, conclusion = ? WHERE id = ?`, [
				TestInstanceResultSetStatus.FINISHED_RUNNING_CHECKS,
				TestInstanceResultSetConclusion.PASSED,
				setId,
			]);
			await this.jobReportService.incrementTestStatusCount(reportId, { passed_test_count: true });
		} else if (isStillInReview) {
			await this.dbManager.fetchSingleRow(`UPDATE test_instance_result_sets SET status = ?, conclusion = ? WHERE id = ?`, [
				TestInstanceResultSetStatus.FINISHED_RUNNING_CHECKS,
				TestInstanceResultSetConclusion.MANUAL_REVIEW_REQUIRED,
				setId,
			]);
			await this.jobReportService.incrementTestStatusCount(reportId, { review_required_test_count: true });
		}

		return { status: "UPDATED" };
	}
}

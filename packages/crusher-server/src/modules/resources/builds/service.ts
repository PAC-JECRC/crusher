import { JobReportStatus } from "@crusher-shared/types/jobReportStatus";
import { DBManager } from "@modules/db";
import { Service, Inject } from "typedi";
import { PLATFORM } from "@crusher-shared/types/platform";
import { BuildStatusEnum, BuildTriggerEnum, IBuildTable, ICreateBuildRequestPayload } from "@modules/resources/builds/interface";
import { getSnakedObject } from "@utils/helper";
import { CamelizeResponse } from "@modules/decorators/camelizeResponse";
import { KeysToCamelCase } from "@modules/common/typescript/interface";
import { BuildReportStatusEnum } from "../buildReports/interface";

interface IBuildInfoItem {
	buildId: number;
	buildName: string | null;
	buildCreatedAt: string;
	buildReportCreatedAt: string;
	buildReportUpdatedAt: string;
	buildDuration: number;
	latestReportId: number;
	buildStatus: JobReportStatus;
	totalTestCount: number;
	passedTestCount: number;
	failedTestCount: number;
	reviewRequiredTestCount: number;
	commentCount: number;
	triggeredById: number;
	triggeredByName: string;
	buildTrigger: BuildTriggerEnum;
}

@Service()
class BuildsService {
	@Inject()
	private dbManager: DBManager;

	@CamelizeResponse()
	async getBuildInfoList(
		projectId: number,
		filter: { triggerType?: BuildTriggerEnum; triggeredBy?: number; search?: string; page?: number; status?: BuildReportStatusEnum },
	): Promise<{ list: Array<IBuildInfoItem>; totalPages: number }> {
		let query =
			"SELECT jobs.id buildId, jobs.commit_name buildName, jobs.build_trigger buildTrigger, TIME_TO_SEC(TIMEDIFF(job_reports.updated_at, job_reports.created_at)) buildDuration, jobs.created_at buildCreatedAt, job_reports.created_at buildReportCreatedAt, job_reports.updated_at buildReportUpdatedAt, jobs.latest_report_id latestReportId, job_reports.status buildStatus, job_reports.total_test_count totalTestCount, job_reports.passed_test_count passedTestCount, job_reports.failed_test_count failedTestCount, job_reports.review_required_test_count reviewRequiredTestCount, comments.count commentCount, users.id triggeredById, users.name triggeredByName FROM users, jobs, job_reports LEFT JOIN (SELECT report_id, COUNT(*) count FROM comments GROUP BY report_id) as comments ON comments.report_id = job_reports.id WHERE jobs.project_id = ? AND job_reports.id = jobs.latest_report_id AND jobs.user_id = users.id AND jobs.is_draft_job = ?";
		const queryParams: Array<any> = [projectId, false];

		if (filter.triggerType) {
			query += " AND jobs.build_trigger = ?";
			queryParams.push(filter.triggerType!);
		}

		if (filter.triggeredBy) {
			query += " AND users.id = ?";
			queryParams.push(filter.triggeredBy!);
		}

		if (filter.status) {
			query += " AND job_reports.status = ?";
			queryParams.push(filter.status);
		}

		if (filter.search) {
			query += ` AND Match(jobs.commit_name, jobs.repo_name, jobs.host) AGAINST (?)`;
			queryParams.push(filter.search);
		}

		const totalRecordCountQuery = `SELECT COUNT(*) count FROM (${query}) custom_query`;
		const totalRecordCountQueryResult = await this.dbManager.fetchSingleRow(totalRecordCountQuery, queryParams);

		query += " ORDER BY jobs.created_at DESC";

		if (filter.page !== -1) {
			query += " LIMIT ?, ?";
			// Weird bug in node-mysql2
			// https://github.com/sidorares/node-mysql2/issues/1239#issuecomment-760086130
			queryParams.push(`${filter.page * 10}`);
			queryParams.push(`10`);
		}

		return { totalPages: Math.ceil(totalRecordCountQueryResult.count / 10), list: await this.dbManager.fetchAllRows(query, queryParams) };
	}

	@CamelizeResponse()
	async getBuild(buildId: number): Promise<KeysToCamelCase<IBuildTable> | null> {
		return this.dbManager.fetchSingleRow("SELECT * FROM jobs WHERE id = ?", [buildId]);
	}

	async createBuild(buildInfo: ICreateBuildRequestPayload): Promise<{ insertId: number }> {
		return this.dbManager.insert(
			`INSERT INTO jobs SET user_id = ?, project_id = ?, host = ?, status = ?, build_trigger = ?, browser = ?, config = ?, meta = ?, is_draft_job = ?`,
			[
				buildInfo.userId,
				buildInfo.projectId,
				buildInfo.host,
				buildInfo.status,
				buildInfo.buildTrigger,
				buildInfo.browser,
				JSON.stringify(buildInfo.config),
				buildInfo.meta ? JSON.stringify(buildInfo.meta) : null,
				buildInfo.isDraftJob ? buildInfo.isDraftJob : false,
			],
		);
	}

	async updateLatestReportId(latestReportId: number, buildId: number) {
		return this.dbManager.update("UPDATE jobs SET latest_report_id = ? WHERE id = ?", [latestReportId, buildId]);
	}

	async updateStatus(status: BuildStatusEnum, buildId: number) {
		return this.dbManager.update("UPDATE jobs SET status = ? WHERE id = ?", [status, buildId]);
	}
}

export { BuildsService };

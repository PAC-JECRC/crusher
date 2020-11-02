export enum BuildStatus {
	QUEUED = "QUEUED",
	RUNNING = "RUNNING",
	PASSED = "PASSED",
	FAILED = "FAILED",
	MANUAL_REVIEW_REQUIRED = "MANUAL_REVIEW_REQUIRED",
	TIMEOUT = "TIMEOUT",
	ABORTED = "ABORTED",
}

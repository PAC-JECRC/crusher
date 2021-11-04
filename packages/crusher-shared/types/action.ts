import { ActionsInTestEnum } from "../constants/recordedActions";
import { iSelectorInfo } from "./selectorInfo";

export enum ActionStatusEnum {
	STARTED = "STARTED",
	SUCCESS = "SUCCESS",
	FAILURE = "FAILURE",
};

export interface iAction {
	type: ActionsInTestEnum;
	status?: ActionStatusEnum;
	name?: string;
	screenshot?: string;
	payload: {
		timeout?: number;
		selectors?: Array<iSelectorInfo>;
		meta?: any;
	};
	url?: string;
}

import { ActionStatusEnum } from "@shared/lib/runnerLog/interface";
import { iAction } from "@shared/types/action";
import { iElementInfo, TRecorderState } from "../reducers/recorder";

export const UPDATE_RECORDER_STATE = "UPDATE_RECORDER_STATE";
export const SET_IS_WEBVIEW_INITIALIZED = "SET_IS_WEBVIEW_INITIALIZED";

export const SET_INSPECT_MODE = "SET_INSPECT_MODE";
export const SET_SELECTED_ELEMENT = "SET_SELECTED_ELEMENT";

export const SET_SITE_URL = "SET_SITE_URL";
export const SET_DEVICE = "SET_DEVICE";

export const UPDATE_SETTINGS = "UPDATE_SETTINGS";
export const RECORD_STEP = "RECORD_STEP";
export const UPDATE_CURRENT_RUNNING_STEP_STATUS = "UPDATE_CURRENT_RUNNING_STEP_STATUS";
export const UPDATE_RECORDED_STEP = "UPDATE_RECORDED_STEP";
export const RESET_RECORDER_STATE = "RESET_RECORDER_STATE";
export const SET_IS_TEST_VERIFIED = "SET_IS_TEST_VERIFIED";
export const DELETE_RECORDED_STEPS = "DELETE_RECORDED_STEPS";
export const MARK_RECORDED_STEPS_OPTIONAL = "MARK_RECORDED_STEPS_OPTIONAL";
export const RESET_RECORDER = "RESET_RECORDER";

export const updateRecorderState = (state: TRecorderState, payload: any) => {
    return {
        type: UPDATE_RECORDER_STATE,
        payload: { state, payload },
    };
};

export const setInspectMode = (isOn: boolean) => {
    return {
        type: SET_INSPECT_MODE,
        payload: { isOn },
    };
}

export const setSelectedElement = (element: iElementInfo) => {
    return {
        type: SET_SELECTED_ELEMENT,
        payload: { element },
    }
}

export const setSiteUrl = (url: string) => {
    return {
        type: SET_SITE_URL,
        payload: { url }
    }
}

export const setDevice = (device: any) => {
    return {
        type: SET_DEVICE,
        payload: { device }
    }
}

export const recordStep = (step: iAction, status: ActionStatusEnum = ActionStatusEnum.STARTED) => {
    return {
        type: RECORD_STEP,
        payload: { step: step, time: Date.now(), status: status }
    };
}

export const updateRecordedStep = (action: iAction, id: number) => {
    return {
        type: UPDATE_RECORDED_STEP,
        payload: { action, id }
    }
};

export const updateCurrentRunningStepStatus = (status: ActionStatusEnum) => {
    return {
        type: UPDATE_CURRENT_RUNNING_STEP_STATUS,
        payload: { status }
    };
}

export const resetRecorderState = (state: TRecorderState) => {
    return {
        type: RESET_RECORDER_STATE,
        payload: {state: state}
    };
}

export const resetRecorder = () => {
    return {
        type: RESET_RECORDER,
    };
}

export const deleteRecordedSteps = (indexArr) => {
    return {
        type: DELETE_RECORDED_STEPS,
        payload: { indexArr }
    }
}

export const markRecordedStepsOptional = (indexArr) => {
    return {
        type: MARK_RECORDED_STEPS_OPTIONAL,
        payload: { indexArr }
    }
};

export const setIsTestVerified = (isVerified: boolean) => {
    return {
        type: SET_IS_TEST_VERIFIED,
        payload: { isTestVerified: isVerified }
    }
}

export const setIsWebViewInitialized = (isInitialized: boolean) => {
    return {
        type: SET_IS_WEBVIEW_INITIALIZED,
        payload: { isInitialized }
    }
}
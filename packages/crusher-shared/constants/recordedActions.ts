export enum ACTIONS_IN_TEST {
	SET_DEVICE = "BROWSER_SET_DEVICE",
	RUN_AFTER_TEST = "BROWSER_RUN_AFTER_TEST",
	NAVIGATE_URL = "PAGE_NAVIGATE_URL",
	BACK_PAGE = "PAGE_BACK",
	RELOAD_PAGE = "RELOAD_PAGE",
	VALIDATE_SEO = "PAGE_VALIDATE_SEO",
	CLICK = "ELEMENT_CLICK",
	ADD_INPUT = "ELEMENT_ADD_INPUT",
	HOVER = "ELEMENT_HOVER",
	WAIT_FOR_NAVIGATION = "PAGE_WAIT_FOR_NAVIGATION",
	PAGE_SCROLL = "PAGE_SCROLL",
	ELEMENT_SCROLL = "ELEMENT_SCROLL",
	ASSERT_ELEMENT = "ELEMENT_ASSERT",
	CUSTOM_ELEMENT_SCRIPT = "ELEMENT_CUSTOM_SCRIPT",
	ELEMENT_SCREENSHOT = "ELEMENT_SCREENSHOT",
	ELEMENT_FOCUS = "ELEMENT_FOCUS",
	BLACKOUT = "ELEMENT_BLACKOUT",
	PAGE_SCREENSHOT = "PAGE_SCREENSHOT",
	WAIT = "PAGE_WAIT",
	PRESS = "ELEMENT_PRESS",
	CUSTOM_CODE = "PAGE_CUSTOM_CODE",
	RUN_TEMPLATE = "PAGE_RUN_TEMPLATE",
}

export enum ActionsInTestEnum {
	SET_DEVICE = "BROWSER_SET_DEVICE",
	RUN_AFTER_TEST = "BROWSER_RUN_AFTER_TEST",
	RUN_TEMPLATE = "PAGE_RUN_TEMPLATE",
	NAVIGATE_URL = "PAGE_NAVIGATE_URL",
	BACK_PAGE = "PAGE_BACK",
	RELOAD_PAGE = "PAGE_RELOAD",
	VALIDATE_SEO = "PAGE_VALIDATE_SEO",
	CLICK = "ELEMENT_CLICK",
	ADD_INPUT = "ELEMENT_ADD_INPUT",
	HOVER = "ELEMENT_HOVER",
	WAIT_FOR_NAVIGATION = "PAGE_WAIT_FOR_NAVIGATION",
	PAGE_SCROLL = "PAGE_SCROLL",
	WAIT = "PAGE_WAIT",
	ELEMENT_SCROLL = "ELEMENT_SCROLL",
	ASSERT_ELEMENT = "ELEMENT_ASSERT",
	CUSTOM_ELEMENT_SCRIPT = "ELEMENT_CUSTOM_SCRIPT",
	CUSTOM_CODE = "PAGE_CUSTOM_CODE",
	ELEMENT_SCREENSHOT = "ELEMENT_SCREENSHOT",
	ELEMENT_FOCUS = "ELEMENT_FOCUS",
	BLACKOUT = "ELEMENT_BLACKOUT",
	PAGE_SCREENSHOT = "PAGE_SCREENSHOT",
	PRESS = "ELEMENT_PRESS",
}

export const ElementActionsInTestArr = Object.values(ActionsInTestEnum).filter((action) => {
	return action.startsWith("ELEMENT_");
});

export const ACTIONS_TO_LABEL_MAP: Record<ACTIONS_IN_TEST, string> = {
	[ACTIONS_IN_TEST.ELEMENT_SCROLL]: "Eleemnt Scroll",
	[ACTIONS_IN_TEST.SET_DEVICE]: "Set a device",
	[ACTIONS_IN_TEST.RUN_AFTER_TEST]: "Run after test",
	[ACTIONS_IN_TEST.NAVIGATE_URL]: "Navigate to URL",
	[ACTIONS_IN_TEST.ADD_INPUT]: "Add input",
	[ACTIONS_IN_TEST.ASSERT_ELEMENT]: "Assert element",
	[ACTIONS_IN_TEST.ELEMENT_SCREENSHOT]: "Screenshot element",
	[ACTIONS_IN_TEST.PAGE_SCREENSHOT]: "Screenshot page",
	[ACTIONS_IN_TEST.ELEMENT_FOCUS]: "Focus on element",
	[ACTIONS_IN_TEST.VALIDATE_SEO]: "Validate SEO",
	[ACTIONS_IN_TEST.BLACKOUT]: "Blackout",
	[ACTIONS_IN_TEST.CLICK]: "Click on element",
	[ACTIONS_IN_TEST.WAIT_FOR_NAVIGATION]: "Wait for navigation",
	[ACTIONS_IN_TEST.CUSTOM_ELEMENT_SCRIPT]: "Add custom element script",
	[ACTIONS_IN_TEST.HOVER]: "Hover on element",
	[ACTIONS_IN_TEST.PAGE_SCROLL]: "Scroll page",
	[ACTIONS_IN_TEST.ELEMENT_SCROLL]: "Scroll element",
	[ACTIONS_IN_TEST.WAIT]: "Wait",
	[ACTIONS_IN_TEST.PRESS]: "Press key",
	[ACTIONS_IN_TEST.CUSTOM_CODE]: "Custom Code",
	[ACTIONS_IN_TEST.RUN_TEMPLATE]: "Run template",
	[ACTIONS_IN_TEST.RELOAD_PAGE]: "Reload page",
	[ACTIONS_IN_TEST.BACK_PAGE]: "Back page",
};

export enum InputNodeTypeEnum {
	CONTENT_EDITABLE = "CONTENT_EDITABLE",
	INPUT = "INPUT",
	CHECKBOX = "CHECKBOX",
	RADIO = "RADIO",
	SELECT = "SELECT",
	MULTISELECT = "MULTISELECT",
	TEXTAREA = "TEXTAREA",
}

export type IInputNodeInfo = { type: InputNodeTypeEnum; value: any; name: string | null; inputType?: string };

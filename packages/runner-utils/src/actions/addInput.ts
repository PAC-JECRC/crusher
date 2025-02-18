import { iAction } from "@crusher-shared/types/action";
import { Locator } from "playwright";
import { type } from "../functions/type";
import { ActionsInTestEnum, InputNodeTypeEnum } from "@crusher-shared/constants/recordedActions";

async function addInput(element: Locator, workingSelector: any, action: iAction) {
	// For legacy addInput type
	if (typeof action.payload.meta.value === "string") {
		await element.fill("");
		await element.type(action.payload.meta.value);
	}

	const { type, value, name, inputType } = action.payload.meta.value;

	switch (type) {
		case InputNodeTypeEnum.INPUT:
		case InputNodeTypeEnum.CONTENT_EDITABLE:
		case InputNodeTypeEnum.TEXTAREA:
			await element.fill("");
			await element.type(value);
			break;
		case InputNodeTypeEnum.RADIO:
			if (value) await element.check();
			break;
		case InputNodeTypeEnum.SELECT:
			if (value && value.length)
				await element.selectOption(
					value.map((a, index) => {
						return { index: a };
					}),
				);
			break;
		case InputNodeTypeEnum.CHECKBOX:
			if (value) await element.check();
	}
}

module.exports = {
	name: ActionsInTestEnum.ADD_INPUT,
	description: "Adding input to element",
	handler: addInput,
};

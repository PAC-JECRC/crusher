import { ActionsInTestEnum } from "@crusher-shared/constants/recordedActions";
import { iAction } from "@crusher-shared/types/action";
import { Locator } from "playwright";

async function clickOnElement(element: Locator) {
	await element.click({ timeout: 5000 });
}

module.exports = {
	name: ActionsInTestEnum.CLICK,
	description: "Click on element",
	handler: clickOnElement,
};

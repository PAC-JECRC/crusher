import { SelectorsModeEnum } from "..";
import { getXpath } from "./element";
import { generateSortedCueSets, getParentElement } from "./generateCueSets";
import { buildSelectorForCues, isSelectorMatch } from "./selectorEngine";
import { RankedSelector, Rect } from "./types";

export function* generateSelectors(
	target: HTMLElement,
	timeout = 1000,
	selectorCache?: Map<HTMLElement, Array<RankedSelector>>,
	mode: SelectorsModeEnum,
): Generator<RankedSelector, void, unknown> {
	const start = Date.now();

	const rectCache = new Map<HTMLElement, Rect>();

	if (selectorCache && selectorCache.has(target)) {
		const rankedSelectors = selectorCache.get(target);
		for (const rankedSelector of rankedSelectors) {
			const isMatch = isSelectorMatch(rankedSelector!.selector, target, rectCache);
			if (isMatch) {
				if (mode === SelectorsModeEnum.SHADOW_DOM_EXPERIMENTAL) {
					yield rankedSelector!;
				} else if (mode === SelectorsModeEnum.NORMAL && isMatch.index < 2) {
					yield rankedSelector!;
				}
			} else {
				// delete from cache if not a match
				// selectorCache.delete(target);
			}
		}
	}

	const cueSets = generateSortedCueSets(target);

	let count = 0;

	for (const cueSet of cueSets) {
		const selector = buildSelectorForCues(cueSet.cues);

		const isMatch = isSelectorMatch(selector, target, rectCache);
		if (isMatch) {
			const rankedSelector = { penalty: cueSet.penalty, selector: isMatch.index !== 1 ? `:nth-match(${selector}, ${isMatch.index})` : selector };
			let returnSelector = false;
			if (mode === SelectorsModeEnum.NORMAL && isMatch.index < 2) {
				returnSelector = true;
			} else if (mode === SelectorsModeEnum.SHADOW_DOM_EXPERIMENTAL) {
				returnSelector = true;
			}

			if (returnSelector) {
				if (selectorCache) {
					const cachedRecord = selectorCache.get(target);
					if (cachedRecord) {
						selectorCache.set(target, [...cachedRecord, rankedSelector]);
					} else {
						selectorCache.set(target, [rankedSelector]);
					}
				}
				yield rankedSelector;
				count += 1;
			}
		}

		if (timeout > 0 && Date.now() - start > timeout) break;
	}

	yield { penalty: 1000, selector: getXpath(target) };
}

export function getSelectors(target: HTMLElement, timeout = 1000, mode : SelectorsModeEnum = SelectorsModeEnum.NORMAL, selectorCache?: Map<HTMLElement, Array<RankedSelector>>): Array<string> {
	if (["::before", "::after"].includes(target.tagName)) {
		target = getParentElement(target) as any;
	}

	if (!target) return [];

	const selectors = generateSelectors(target, timeout, selectorCache, mode);

	const selectorList = [];
	let index = 0;
	for (const selector of selectors) {
		// take the first one
		if (index > 10) { break; }
		selectorList.push(selector.selector);
		index++;
	}

	return selectorList;
}

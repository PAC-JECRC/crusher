import TabStorage from "./utils/tabStorage";
import FrameStorage from "./utils/frameStorage";
import UserAgents from "../../crusher-shared/constants/userAgents";
import TabChangeInfo = chrome.tabs.TabChangeInfo;
import Tab = chrome.tabs.Tab;
import WebRequestDetails = chrome.webRequest.WebRequestDetails;
import WebRequestFullDetails = chrome.webRequest.WebRequestFullDetails;
import WebResponseHeadersDetails = chrome.webRequest.WebResponseHeadersDetails;
import HttpHeader = chrome.webRequest.HttpHeader;
import { UserAgent } from "../../crusher-shared/types/userAgent";
import { AdvancedURL } from "./utils/url";

class ChromeEventsListener {
	state: any;

	constructor() {
		this.onTabUpdated = this.onTabUpdated.bind(this);
		this.onTabRemoved = this.onTabRemoved.bind(this);
		this.onBeforeRequest = this.onBeforeRequest.bind(this);
		this.onHeadersReceived = this.onHeadersReceived.bind(this);
		this.onBeforeSendHeaders = this.onBeforeSendHeaders.bind(this);
		this.onBeforeNavigation = this.onBeforeNavigation.bind(this);
	}

	isRegisteredAsCrusherWindow(tabId: number) {
		const tab = TabStorage.get(tabId);

		if (!tab || !tab.id) {
			return false;
		}

		return TabStorage.isExtension(tab.id);
	}

	onTabRemoved(tabId: number) {
		if (TabStorage.get(tabId)) {
			TabStorage.remove(tabId);
		}
	}

	onTabUpdated(tabId: number, changeInfo: TabChangeInfo, tab: Tab) {
		if (tab.url && AdvancedURL.checkIfCrusherExtension(tab.url)) {
			// @TODO: In case `iframeURL` is empty, show a modal asking for target website url.
			const iframeURL: string = AdvancedURL.getParameterByName(
				"url",
				tab.url,
			) as string;

			const crusherAgent = AdvancedURL.getParameterByName(
				"__crusherAgent__",
				iframeURL,
			);

			const selectedUserAgent: UserAgent | undefined = UserAgents.find(
				(agent) => agent.name === (crusherAgent || UserAgents[6].value),
			);

			TabStorage.set(
				tabId,
				tab,
				selectedUserAgent ? selectedUserAgent.value : UserAgents[0].value,
			);
		}
	}

	onBeforeRequest(details: WebRequestDetails) {
		const areActionsAllowed = this.isRegisteredAsCrusherWindow(details.tabId);

		if (!areActionsAllowed || details.parentFrameId !== 0) {
			return { cancel: false };
		}

		chrome.browsingData.remove(
			{},
			{
				serviceWorkers: true,
			},
		);

		return { cancel: false };
	}

	onHeadersReceived(details: WebResponseHeadersDetails) {
		const isRegisteredAsCrusherWindow = this.isRegisteredAsCrusherWindow(
			details.tabId,
		);
		const headers: Array<HttpHeader> | undefined = details.responseHeaders;

		if (!headers || !isRegisteredAsCrusherWindow || details.parentFrameId !== 0) {
			return { responseHeaders: headers };
		}

		const responseHeaders = headers.filter((header) => {
			const name = header.name.toLowerCase();
			return (
				["x-frame-options", "content-security-policy", "frame-options"].indexOf(
					name,
				) === -1
			);
		});

		const redirectUrl = headers.find(
			(header) => header.name.toLowerCase() === "location",
		);

		if (redirectUrl) {
			chrome.browsingData.remove(
				{},
				{
					serviceWorkers: true,
				},
			);
		}

		return {
			responseHeaders,
		};
	}

	onBeforeSendHeaders(details: WebRequestFullDetails) {
		const isRegisteredAsCrusherWindow = this.isRegisteredAsCrusherWindow(
			details.tabId,
		);
		const headers: Array<HttpHeader> | undefined = details.requestHeaders;

		if (!isRegisteredAsCrusherWindow || details.parentFrameId !== 0) {
			return { requestHeaders: headers };
		}

		const frame = FrameStorage.get(details.tabId, details.frameId);
		if (!frame) {
			return {
				requestHeaders: details.requestHeaders,
			};
		}

		const userAgent = TabStorage.get(details.tabId).crusherAgent;

		details.requestHeaders?.push({
			name: "User-Agent",
			value: userAgent,
		});

		return { requestHeaders: details.requestHeaders };
	}

	onBeforeNavigation(details: any) {
		const isAllowed = this.isRegisteredAsCrusherWindow(
			TabStorage.get(details.tabId),
		);

		if (!isAllowed || details.frameId === 0) {
			return;
		}

		if (details.parentFrameId === 0 && details.url) {
			const userAgentId = AdvancedURL.getParameterByName(
				"__crusherAgent__",
				details.url,
			);
			const userAgentFromUrl = UserAgents.find(
				(agent) => agent.name === userAgentId,
			);
			const userAgent = userAgentFromUrl
				? userAgentFromUrl.value
				: TabStorage.get(details.tabId).crusherAgent;

			if (userAgent) {
				FrameStorage.set({
					...details,
					userAgent,
				});
			}
		}
	}

	registerEventListeners() {
		chrome.tabs.onUpdated.addListener(this.onTabUpdated);
		chrome.tabs.onRemoved.addListener(this.onTabRemoved);

		chrome.webRequest.onBeforeRequest.addListener(
			this.onBeforeRequest,
			{ urls: ["<all_urls>"] },
			["blocking"],
		);

		chrome.webRequest.onBeforeSendHeaders.addListener(
			this.onBeforeSendHeaders,
			{ urls: ["<all_urls>"], types: ["sub_frame"] },
			["blocking", "requestHeaders"],
		);

		chrome.webRequest.onHeadersReceived.addListener(
			this.onHeadersReceived,
			{ urls: ["<all_urls>"], types: ["sub_frame", "main_frame"] },
			["blocking", "responseHeaders"],
		);

		chrome.webNavigation.onBeforeNavigate.addListener(this.onBeforeNavigation);
	}

	boot() {
		this.registerEventListeners();
	}
}

const chromeEventsManager = new ChromeEventsListener();
chromeEventsManager.boot();

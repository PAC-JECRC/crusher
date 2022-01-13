import React from "react";
import { css, Global } from '@emotion/react'
import { render } from "react-dom";
import { Toolbar } from './components/toolbar';
import { DeviceFrame } from './components/device-frame';
import { Sidebar } from './components/sidebar';
import "../../static/assets/styles/tailwind.css";
import configureStore from "../store/configureStore";
import { Provider, useDispatch, useSelector, useStore } from "react-redux";
import { getInitialStateRenderer } from 'electron-redux';
import { ipcRenderer } from "electron";
import { resetRecorder, setDevice, setIsWebViewInitialized, updateRecorderState } from "../store/actions/recorder";
import { getRecorderInfo, getSavedSteps, isWebViewInitialized } from "../store/selectors/recorder";
import { performNavigation, performReplayTest, performSetDevice, resetStorage, saveSetDeviceIfNotThere } from "./commands/perform";
import {devices} from "../devices";
import { iReduxState } from "../store/reducers/index";
import { IDeepLinkAction } from "../types";
import { Emitter } from "event-kit";
import { setSessionInfoMeta, setSettngs, setShowShouldOnboardingOverlay } from "../store/actions/app";
import { getAppSessionMeta } from "../store/selectors/app";
import { ToastSnackbar } from "./components/toast";
import { TRecorderState } from "../store/reducers/recorder";
import {webFrame} from "electron";
import { TourProvider, useTour } from '@reactour/tour'

webFrame.setVisualZoomLevelLimits(1, 3)

const emitter = new Emitter();

const App = () => {
	const store = useStore();
	const recorderInfo = useSelector(getRecorderInfo);
	
	React.useEffect(() => {
		ipcRenderer.on("webview-initialized", (event: Electron.IpcRendererEvent, { initializeTime }) => {
			store.dispatch(setIsWebViewInitialized(true));
			store.dispatch(updateRecorderState(TRecorderState.RECORDING_ACTIONS, {}));
			const recorderInfo = getRecorderInfo(store.getState() as any);
			performSetDevice(recorderInfo.device);

			emitter.emit("renderer-webview-initialized");
			if(recorderInfo.url) {
				// Perform navigation to the url that was set before the webview was initialized
				performNavigation(recorderInfo.url, store);
			}
		});

		ipcRenderer.send("renderer-ready", /* @TODO Add correct rendering time */ 1500);

		ipcRenderer.on("url-action",   (event: Electron.IpcRendererEvent, { action }: { action: IDeepLinkAction }) => {
			if(action.commandName === "replay-test") {
				const isWebViewPresent = isWebViewInitialized(store.getState() as any);
				const sessionInfoMeta = getAppSessionMeta(store.getState() as any);
				store.dispatch(setSessionInfoMeta({
					...sessionInfoMeta,
					editing: {
						testId: action.args.testId,
					}
				}));

				if(isWebViewPresent) {
					performReplayTest(action.args.testId);
				} else {
					store.dispatch(setDevice(devices[0].id));
					emitter.once("renderer-webview-initialized", () => {
						console.log("Render webview initialized listener called");
						performReplayTest(action.args.testId)
					})
				}
			}
		});

		window.onbeforeunload = () => {
			store.dispatch(resetRecorder());
			store.dispatch(setSessionInfoMeta({}));
			resetStorage();
		};
	}, []);

	React.useEffect(() => {
		var currentzoom = 1;
		document.body.addEventListener('mousewheel', (e: any) => {
		  if(e.ctrlKey){ 
		  const delta = e.wheelDelta / 1500
		  zoom(delta, e)
		  }
		})
		
		function zoom(delta, event: any) {
		var img = document.body;
		var width = img.offsetWidth;
		var height = img.offsetHeight;
		var x = event.pageX; 
		var y = event.pageY; 
		var xpercent = x*100/width;
		var ypercent = y*100/height;
			img.style.transform = "scale("+currentzoom+")";
			if(currentzoom + delta < 1 || currentzoom + delta > 5 ) return;
		  currentzoom += delta;
		  img.style.transformOrigin = (xpercent<0 ? 0 : xpercent) + "% "+ (ypercent < 0 ? 0 : ypercent) +"%";
		}
	}, []);

	return (
        <div css={containerStyle}>
            <Global styles={globalStyles} />
            <div css={bodyStyle}>
                    <Toolbar css={toolbarStyle} />
                    <DeviceFrame css={deviceFrameContainerStyle} />
            </div>
            <Sidebar css={sidebarStyle} />
				
			<ToastSnackbar />
        </div>
	);
};

const containerStyle = css`
	display: flex;
	background: #020202;
	width: 100%;
	overflow-x: hidden;
	height: 100vh;
	color: white;
`;
const bodyStyle = css`
	flex: 1;
	display: grid;
	grid-template-rows: 62rem;
	flex-direction: column;
`;
const sidebarStyle = css`
	padding: 1rem;
	width: 350rem;
	background-color: #111213;
`;
const toolbarStyle = css`
	background-color: #111213;
	padding: 5rem;
	min-height: 60rem;
`;
const deviceFrameContainerStyle = css`
	flex: 1;
	overflow: auto;
`;
const globalStyles = css`
	body {
		margin: 0;
		padding: 0;
		min-height: "100vh";
		max-width: "100vw";
	}
	.custom-scroll::-webkit-scrollbar {
		width: 12rem;
	}

	.custom-scroll::-webkit-scrollbar-track {
		background-color: #0a0b0e;
		box-shadow: none;
	}

	.custom-scroll::-webkit-scrollbar-thumb {
		background-color: #1b1f23;
		border-radius: 100rem;
	}

	.custom-scroll::-webkit-scrollbar-thumb:hover {
		background-color: #272b31;
		border-radius: 100rem;
	}
`;

const initialReduxState: iReduxState = getInitialStateRenderer();
initialReduxState.app.shouldShowOnboardingOverlay = localStorage.getItem("app.showShouldOnboardingOverlay") === "false" ? false : true;
if(!localStorage.getItem("app.settings")) {
	initialReduxState.app.settings.backendEndPoint = process.env.BACKEND_URL;
	initialReduxState.app.settings.frontendEndPoint = process.env.FRONTEND_URL;
}

initialReduxState.app.settings = localStorage.getItem("app.settings") ? JSON.parse(localStorage.getItem("app.settings")) : initialReduxState.app.settings;

const store = configureStore(initialReduxState, "renderer");

// Weirdly main process store doesn't get updated, this will fix it
store.dispatch(setSettngs(initialReduxState.app.settings));
store.dispatch(setShowShouldOnboardingOverlay(initialReduxState.app.shouldShowOnboardingOverlay));

const MoreStepsOnboarding = () => {
	const store = useStore();
	const [startingOffset, setStartingOffset] = React.useState(getSavedSteps(store.getState() as any).length);
	const savedSteps = useSelector(getSavedSteps);
	const {setCurrentStep} = useTour();

	React.useEffect(() => {
		if(savedSteps.length - startingOffset === 5) {
			setCurrentStep(5);
		}
	}, [savedSteps]);

	return (
			<div>
				<div css={css`font-family: Cera Pro; font-size: 15rem; font-weight: 600;`}>We automatically detect your actions</div>
				<p className={"mt-8"} css={css`font-family: Gilroy; font-size: 14rem;`}>Let's record few more steps in our test and finally save it</p>
				<div className={"mt-4"} css={css`position: absolute; font-size: 12rem;`}>{savedSteps.length - startingOffset}/5</div>
			</div>
	)
}

const OnboardingItem = ({title, description}) => {
	return (
		<div>
			<div css={css`font-family: Cera Pro; font-size: 15rem; font-weight: 600;`}>{title}</div>
			<p className={"mt-8"} css={css`font-family: Gilroy; font-size: 14rem;`}>{description}</p>
		</div>
	);
}
const steps = [
	{
		selector: `#target-site-input`,
		content: (<OnboardingItem
			title={"Enter URL of website you want to test"}
			description={"You can open crusher-recorder from apps or CLI."}
		/>),
	},
	{
		selector: `#select-element-action`,
		content: (<OnboardingItem
			title={"Turn on element mode"}
			description={"Right click over the element or click here"}
		/>),
},
{
	selector: `#device_browser`,
	content: (<OnboardingItem
		title={"Select an element"}
		description={"Move your mouse over the element and click on it"}
	/>),
},
{
	selector: `#element-actions-list`,
	content: (<OnboardingItem
		title={"Select a element action"}
		description={"You can click, hover, take screenshot or add assertions"}
	/>),
},
{
	selector: `#device_browser`,
	content: <MoreStepsOnboarding/>,
},
{
	selector: `#verify-save-test`,
	content: (
		<OnboardingItem
			title={"Verify and Save"}
			description={"Time to save your first test"}
		/>
	),
},
];

const opositeSide = {
	top: "bottom",
	bottom: "top",
	right: "left",
	left: "right"
  };
const popoverPadding = 10;

function doArrow(position, verticalAlign, horizontalAlign) {
	if (!position || position === "custom") {
	  return {};
	}
  
	const width = 16;
	const height = 12;
	const color = "#111213";
	const isVertical = position === "top" || position === "bottom";
	const spaceFromSide = popoverPadding;
	const obj = {
	  [isVertical ? "borderLeft" : "borderTop"]: `${
		width / 2
	  }px solid transparent`, // CSS Triangle width
	  [isVertical ? "borderRight" : "borderBottom"]: `${
		width / 2
	  }px solid transparent`, // CSS Triangle width
	  [`border${position[0].toUpperCase()}${position.substring(
		1
	  )}`]: `${height}px solid ${color}`, // CSS Triangle height
	  [isVertical ? opositeSide[horizontalAlign] : verticalAlign]:
		height + spaceFromSide, // space from side
	  [opositeSide[position]]: -height + 2
	};
  
	return {
	  "&::after": {
		content: "''",
		width: 0,
		height: 0,
		position: "absolute",
		...obj
	  }
	};
  }
  
render(
<Provider store={store}>
	<TourProvider onClickMask={() => {}} disableDotsNavigation={true} disableKeyboardNavigation={true} showPrevNextButtons={false} disableFocusLock={true} showBadge={false} styles={{popover: (base, state) => ({
		...base,
		background: 'linear-gradient(0deg, #111213, #111213), rgba(10, 11, 14, 0.4)',
		border: '0.5px solid rgba(255, 255, 255, 0.1)',
		borderRadius: '8rem',
		color: '#fff',
		fontSize: '14rem',
		minWidth: '400rem',
		...doArrow(state.position, state.verticalAlign, state.horizontalAlign)
	})}} steps={steps}>
        <App />
	</TourProvider>
</Provider>
, document.querySelector("#app-container"));

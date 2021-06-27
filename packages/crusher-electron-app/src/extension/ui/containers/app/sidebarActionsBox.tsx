import React, { RefObject, ChangeEvent, useRef, useEffect, useState } from "react";
import { ActionStepList } from "./actionStepList";
import { useDispatch, useSelector } from "react-redux";
import { getActionsRecordingState, getAutoRecorderState } from "../../../redux/selectors/recorder";
import { Conditional } from "../../components/conditional";
import { ACTIONS_RECORDING_STATE } from "../../../interfaces/actionsRecordingState";
import { TopLevelActionsList } from "./topLevelActionsList";
import { ElementLevelActionsList } from "./elementLevelActionsList";
import { OVERFLOW, POSITION } from "../../../interfaces/css";
import { SelectElementPlaceholder } from "./selectElementPlaceholder";
import { SettingsIcon, SwitchOffIcon, SwitchOnIcon } from "../../../assets/icons";
import { getStore } from "../../../redux/store";
import { updateActionsRecordingState, updateAutoRecorderSetting } from "../../../redux/actions/recorder";
import { COLOR_CONSTANTS } from "../../colorConstants";
import { BlueButton } from "../../components/app/BlueButton";
import { createPopper } from "@popperjs/core";

interface iSidebarActionBoxProps {
	deviceIframeRef: RefObject<HTMLIFrameElement>;
}

const SidebarActionsBox = (props: iSidebarActionBoxProps) => {
	const [isTooltipHovered, setIsTooltipHovered] = useState(false);
	const popperArrowRef = useRef(null as HTMLDivElement);
	const autoActionsTagRef = useRef(null as HTMLDivElement);
	const autoActionsTooltipRef = useRef(null as HTMLDivElement);
	const recordingState = useSelector(getActionsRecordingState);
	const dispatch = useDispatch();

	const handleAutoDetectModeToggle = (event: ChangeEvent<HTMLInputElement>) => {
		const store = getStore();
		store.dispatch(updateAutoRecorderSetting(event.target.checked));
	};

	const isAutoHoverOn = useSelector(getAutoRecorderState);

	const toggleCustomIsCheck = () => {
		dispatch(updateActionsRecordingState(ACTIONS_RECORDING_STATE.PAGE));
	};

	const DetectActionSwitch = () => (
		<div>
			<label className="switch cursor-pointer">
				<input type="checkbox" defaultChecked={isAutoHoverOn} onChange={handleAutoDetectModeToggle} />
				{isAutoHoverOn ? <SwitchOnIcon /> : <SwitchOffIcon />}
			</label>
		</div>
	);

	const handleAutoActionsTagMouseEnter = () => {
		setIsTooltipHovered(true);
		createPopper(autoActionsTagRef.current, autoActionsTooltipRef.current, {
			placement: "bottom",
			modifiers: [
				{
					name: "offset",
					options: {
						offset: [0, 10],
					},
				},
				{
					name: "arrow",
				},
			],
		});
	};

	const handleAutoActionsTagMouseOut = () => {
		setIsTooltipHovered(false);
	};

	const AddCustomCheckView = () => (
		<div className="flex flex-col pt-72 items-center justify-center h-full">
			<DetectActionSwitch />
			<div className="mt-4  flex flex-col items-center pb-100">
				<div
					className="text-white
				font-semibold mt-28
				text-center text-15 mb-12"
				>
					We're detecting your actions
				</div>
				<h6 className="text-gray-300 text-center text-13">For manual control, you can add custom checks</h6>
				<BlueButton className="mt-24" onClick={toggleCustomIsCheck} title="Add custom check" />
				<div
					onMouseOver={handleAutoActionsTagMouseEnter}
					onMouseOut={handleAutoActionsTagMouseOut}
					ref={autoActionsTagRef}
					className="underline text-gray-500 text-12 mt-44"
				>
					Which actions are automatically detected?
				</div>
				<div ref={autoActionsTooltipRef} style={{ ...autoActionsTooltipStyle, display: isTooltipHovered ? "block" : "none" }}>
					<span>
						Navigation, Scroll, Hover and Click actions
						<br /> are recorded automatically.
					</span>
					<div className={"popper-arrow"} data-popper-arrow></div>
				</div>
			</div>
		</div>
	);

	return (
		<div style={sidebarStyle} className="flex flex-col h-screen pt-2">
			<div
				className={`flex h-20 
			${!(recordingState.type === ACTIONS_RECORDING_STATE.PAGE) ? "justify-end" : "justify-center"} 
			items-center`}
			>
				{!(recordingState.type === ACTIONS_RECORDING_STATE.PAGE) ? (
					<div className="mr-28 mt-12 cursor-pointer">
						<SettingsIcon />
					</div>
				) : (
					<div className="flex items-center text-white h-10 max-w-max">
						<DetectActionSwitch />
						<div className="pl-1 pt-1 text-15">Detect actions</div>
					</div>
				)}
			</div>
			<div
				style={{ height: "55%" }}
				className="flex mt-1 flex-col
				  border-b-2
				  p-24   border-gray-800"
			>
				<div className="flex justify-between items-center">
					<h5
						className="text-white font-semibold
						text-md text-17"
					>
						Actions
					</h5>
				</div>
				<Conditional If={recordingState.type === ACTIONS_RECORDING_STATE.INITIAL_STATE}>
					<AddCustomCheckView />
				</Conditional>
				<div>
					<div style={actionContainerStyle}>
						<Conditional If={recordingState.type === ACTIONS_RECORDING_STATE.SELECT_ELEMENT}>
							<SelectElementPlaceholder deviceIframeRef={props.deviceIframeRef} />
						</Conditional>
						<Conditional If={recordingState.type === ACTIONS_RECORDING_STATE.PAGE}>
							<TopLevelActionsList deviceIframeRef={props.deviceIframeRef} />
						</Conditional>
						<Conditional If={recordingState.type === ACTIONS_RECORDING_STATE.ELEMENT}>
							<ElementLevelActionsList deviceIframeRef={props.deviceIframeRef} />
						</Conditional>
					</div>
				</div>
			</div>
			<ActionStepList />
		</div>
	);
};

const autoActionsTooltipStyle = {
	position: POSITION.ABSOLUTE,
	backgroundColor: "#333",
	color: "white",
	padding: "5px 10px",
	borderRadius: "4px",
	fontSize: "13px",
	top: -100,
	left: -100,
};
const sidebarStyle = {
	background: COLOR_CONSTANTS.PRIMARY,
	width: "22%",
};

const actionContainerStyle = {
	position: POSITION.RELATIVE,
	marginTop: "1rem",
	overflow: OVERFLOW.AUTO,
};

export { SidebarActionsBox };

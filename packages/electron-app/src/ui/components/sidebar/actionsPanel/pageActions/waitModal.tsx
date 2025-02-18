import { Button } from "@dyson/components/atoms/button/Button";
import { Input } from "@dyson/components/atoms/input/Input";
import { Modal } from "@dyson/components/molecules/Modal";
import { css } from "@emotion/react";
import { ActionsInTestEnum } from "@shared/constants/recordedActions";
import { ActionStatusEnum } from "@shared/lib/runnerLog/interface";
import { recordStep } from "electron-app/src/store/actions/recorder";
import React from "react";
import { useDispatch } from "react-redux";
import { ModalTopBar } from "../../../modals/topBar";

interface iStartupModalProps {
	isOpen: boolean;
    handleClose: () => void;
}

const WaitModal = (props: iStartupModalProps) => {
	const { isOpen } = props;
	const [interval, setInterval] = React.useState("");
    const dispatch = useDispatch();

	const handleIntervalChange = (event) => {
		setInterval(event.target.value);
	};

	const handleSubmit = React.useCallback(() => {
		if (!interval.trim().length) {
			alert("Please enter a valid interval");
			return;
		}

		dispatch(
			recordStep({
				type: ActionsInTestEnum.WAIT,
				payload: {
					timeout: parseInt(interval),
					meta: {},
				},
			},  ActionStatusEnum.COMPLETED			),
		);
		props.handleClose();
	}, [interval]);

	if(!isOpen) return null;

	return (
		<Modal modalStyle={modalStyle} onOutsideClick={props.handleClose}>
			<ModalTopBar title={"Wait For Seconds"} desc={"These are used to wait/sleep for the specified interval"} closeModal={props.handleClose} />
			<div className="flex flex-col" style={{ marginTop: 40 }} css={css`padding: 26rem 34rem;`}>
				<div className="flex" css={css`display: flex`}>
					<Input
						css={inputStyle}
						placeholder={"Add seconds to wait in seconds"}
						pattern="[0-9]*"
						size={"medium"}
						initialValue={interval}
						onChange={handleIntervalChange}
					/>

					<Button onClick={handleSubmit} bgColor="tertiary-outline" css={buttonStyle}>
						{"Save"}
					</Button>
				</div>
			</div>
		</Modal>
	);
};

const buttonStyle = css`
	font-size: 13rem;
	border: 1px solid rgba(255, 255, 255, 0.23);
	box-sizing: border-box;
	border-radius: 4rem;
	width: 93rem;
	height: 34rem;
	margin-left: 24rem;
`;

const modalStyle = css`
	width: 800rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -20%);
	display: flex;
	flex-direction: column;
	padding: 0rem;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.42)), #111213;
`;


const inputStyle = css`
	background: #1A1A1C;
	border-radius: 6rem;
	border: 1rem solid #43434F;
	font-family: Gilroy;
	font-size: 14rem;
	min-width: 358rem;
	color: #fff;
	outline: none;
`;

export { WaitModal };

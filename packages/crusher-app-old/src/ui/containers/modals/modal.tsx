import React from "react";
import ReactDOM from "react-dom";
import { css } from "@emotion/core";
import CrossModal from "../../../../public/svg/modals/cross.svg";

interface iProps {
	heading: string;
	subHeading: string;
	topAreaCSS: any; //gradient for topbar
	contentCSS: any; //Css for content. Overrides existing css
	children: any;
	illustration: any;
	illustrationContainerCSS: any;
	mainContainerCSS: any;
	containerCSS: any;
	headingCss: any;
	descCss: any;
	onClose: any;
}

class Modal extends React.Component<iProps, any> {
	render() {
		const {
			heading,
			subHeading,
			topAreaCSS,
			contentCSS,
			children,
			illustration,
			illustrationContainerCSS,
			containerCSS,
			headingCss,
			descCss,
			onClose,
			mainContainerCSS: _manualMainContainerCSS,
		} = this.props;

		return ReactDOM.render(
			<div css={[containerCss, containerCSS]}>
				<div css={[modalContainerCss, _manualMainContainerCSS]}>
					<div css={[topContainerCss, topAreaCSS]}>
						<div className={"modalHeading"} css={headingCss}>
							{heading}
						</div>
						<div className={"modalDesc"} css={descCss}>
							{subHeading}
						</div>
						<div css={crossModalCss} onClick={onClose}>
							<CrossModal />
						</div>
						<div css={[illustrationContainerCss, illustrationContainerCSS]}>
							<img src={illustration} />
						</div>
					</div>
					<div css={[bodyContainerCss, contentCSS]}>{children}</div>
				</div>
			</div>,
			document.getElementById("overlay"),
		);
	}
}

const containerCss = css`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(22, 21, 21, 0.95);
	z-index: 1001;
`;

const modalContainerCss = css`
	// width: 31.35rem;
	width: 33.35rem;
	position: relative;
	top: 25%;
	left: 50%;
	transform: translate(-50%, -20%);
	overflow: hidden;
	border-radius: 0.5rem;
`;

const illustrationContainerCss = css`
	position: absolute;
	top: -0.8rem;
	right: -0.5rem;
	img {
		width: 15.15rem;
	}
`;

const topContainerCss = css`
	color: #fff;
	padding: 1.6rem 1.75rem 3.075rem 1.75rem;
	padding-bottom: 2.25rem;
	position: relative;
	font-family: Cera Pro;
	.modalHeading {
		font-weight: 900;
		font-size: 1.75rem;
	}
	.modalDesc {
		font-size: 1.25rem;
		margin-top: -0.25rem;
		margin-bottom: 0.5rem;
	}
`;

const bodyContainerCss = css`
	width: 100%;
	background: #fff;
	padding: 1.5rem 1.75rem 2rem 1.75rem;
	margin-bottom: 1.5rem;
	font-family: Gilroy;
	color: #2e2e2e;

	border: 2px solid #d7d7d7;
	border-top: 0;
	border-bottom-left-radius: 0.5rem;
	border-bottom-right-radius: 0.5rem;
`;

const crossModalCss = css`
	position: absolute;
	top: 1.5rem;
	right: 2rem;
	cursor: pointer;
	z-index: 2;
`;

export { Modal };

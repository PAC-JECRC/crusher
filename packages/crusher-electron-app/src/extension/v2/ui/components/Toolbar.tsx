import React from "react";
import { Input } from "@dyson/components/atoms/input/Input";
import { Button } from "@dyson/components/atoms/button/Button";
import { Text } from "@dyson/components/atoms/text/Text";
import { Dropdown } from "@dyson/components/molecules/Dropdown";
import { css } from "@emotion/react";
import { NavigateBackIcon, NavigateRefreshIcon, SettingsIcon } from "crusher-electron-app/src/extension/assets/icons";
import { TextBlock } from "@dyson/components/atoms/textBlock/TextBlock";
import { Conditional } from "@dyson/components/layouts";

const saveButtonStyle = css`
	width: 113px;
	height: 30px;
	background: linear-gradient(0deg, #9462ff, #9462ff);
	border-radius: 6px;
	font-family: Gilroy;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 17px;

	color: #ffffff;
`;
const recTextStyle = css`
	font-family: Cera Pro;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 13px;
	flex-grow: 1;
`;
const onlineDotStyle = css`
	display: block;
	width: 8px;
	height: 8px;
	background: #a8e061;
	border-radius: 50px;
	margin: 0rem;
`;

const Toolbar = (): JSX.Element => {
	const [start, setStart] = React.useState(false);
	return (
		<div css={containerStyle}>
			<NavigateBackIcon onClick={() => 0} disabled={!start} />
			<NavigateRefreshIcon onClick={() => 0} disabled={!start} />
			<Input
				placeholder="Enter URL to test"
				CSS={inputStyle}
				rightIcon={
					<div
						css={css`
							box-sizing: border-box;
							width: 80rem;
							position: relative;
						`}
					>
						<Dropdown
							dropdownCSS={css`
								width: 80rem;
								transform: translateX(-10%);
							`}
							component={
								<>
									<TextBlock
										css={css`
											padding: 6rem 4rem;
										`}
									>
										Desktop
									</TextBlock>
									<TextBlock
										css={css`
											padding: 6rem 4rem;
										`}
									>
										Tablet
									</TextBlock>
								</>
							}
						>
							<TextBlock
								css={css`
									box-sizing: border-box;
									text-align: center;
									height: 34rem;
									width: 80rem;
									padding: 10rem 0rem;
									border-left: 1px solid rgba(255, 255, 255, 0.13);
								`}
							>
								Mobile
							</TextBlock>
						</Dropdown>
					</div>
				}
			/>
			<Conditional showIf={!start}>
				<Button onClick={() => setStart(true)} bgColor="tertiary-outline" CSS={buttonStyle}>
					Start
				</Button>
			</Conditional>
			<Conditional showIf={start}>
				<div css={onlineDotStyle} />
				<Text CSS={recTextStyle}>Rec.</Text>
				<SettingsIcon />
				<Button onClick={() => setStart(false)} bgColor="tertiary-outline" CSS={saveButtonStyle}>
					Save test
				</Button>
			</Conditional>
		</div>
	);
};

const containerStyle = css`
	display: flex;
	align-items: center;
	padding: 8rem;
	* {
		margin: 0rem 10rem;
	}
`;
const inputStyle = css`
	width: 340px;
	height: 34px;
	font-family: Gilroy;
	font-size: 14.6px;
	border: 1px solid #9462ff;
	outline-color: #9462ff;
	box-sizing: border-box;
	border-radius: 4px;
	color: rgba(255, 255, 255, 0.93);
`;
const buttonStyle = css`
	font-size: 14rem;
	border: 1px solid rgba(255, 255, 255, 0.23);
	box-sizing: border-box;
	border-radius: 4px;
	width: 93px;
	height: 34px;
`;
export default Toolbar;

import React, { useState } from "react";
import { ExpandableList, ExpandableListItem } from "./expandableList";
import { FullScreenSVG } from "@svg/dashboard";
import { css } from "@emotion/react";
import { Button } from "dyson/src/components/atoms/button/Button";
import { PlaySVG } from "@svg/dashboard";
import { DownloadButton } from "@ui/containers/dashboard/Download";
import { Conditional } from "dyson/src/components/layouts";
import dynamic from "next/dynamic";

interface TTestIntegrationListProps {
	className?: string;
}
const Download = dynamic(() => import("@ui/containers/dashboard/Download"));

function OnboardingSteps(props: TTestIntegrationListProps) {
	const [selected, setSelected] = useState(0);
	const [showCreateTest, setShowCreateTest] = useState(false);
	const handleChangeItem = (index: number) => {
		setSelected(index);
	};

	return (
		<div {...props}>
			<ExpandableList css={listStyle} currentSelected={selected} changeSelected={handleChangeItem}>
				<ExpandableListItem title="Download recorder & create test" completed={false}>
					<div className="mt-40 pl-32 pb-16">
						<table css={downloadGridContainerStyle}>
							<tbody>
								<tr>
									<td
										css={css`
											vertical-align: baseline;
										`}
									>
										<span className={"label text-14"}>Download</span>
									</td>
									<td>
										<div className={"ml-40 "}>
											<DownloadButton
												css={css`
													align-items: flex-start;
												`}
											/>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<span className={"label text-14"}>& Then</span>
									</td>
									<td>
										<div className={"ml-40"}>
											<Button bgColor={"tertiary-dark"} size="medium" onClick={setShowCreateTest.bind(this, true)}>
												<div className={"flex items-center justify-center"}>
													<PlaySVG className={"mr-12"} />
													<span className={"mt-2"}>Create a test</span>
												</div>
											</Button>

											<Conditional showIf={showCreateTest}>
												<Download onClose={setShowCreateTest.bind(this, false)} />
											</Conditional>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</ExpandableListItem>
				<ExpandableListItem title="Integrate in your worflow" completed={false}></ExpandableListItem>
				<ExpandableListItem title="Run tests" completed={false}></ExpandableListItem>
				<ExpandableListItem title="View reports" completed={false}></ExpandableListItem>
			</ExpandableList>
			<div className={"flex flex-row mt-30"}>
				<div css={haveTestStyle} className="migrate-test text-13">
					<a href={"https://forms.gle/CdpyTa61LSt9nj4G6"} target={"_blank"}>
						Already have tests? Migrate to Crusher
					</a>
				</div>
				<div className={"ml-auto flex items-center"}>
					<span css={checkoutProjectStyle} className={"text-13 mr-12"}>
						Or checkout <u className={"text-13 mr-0"}>Demo Project</u>
					</span>
					<FullScreenSVG css={fullScreenIconStyle} />
				</div>
			</div>
		</div>
	);
}

const listStyle = css`
	border: 1px solid #171c24;
	border-radius: 12rem;
`;
const haveTestStyle = css`
	color: #fff !important;
	a {
		cursor: default;
	}
	:hover {
		text-decoration: underline;
	}
`;
const checkoutProjectStyle = css`
	color: rgb(208, 208, 208) !important;
`;
const fullScreenIconStyle = css`
	height: 12.5rem;
	width: 12.5rem;
`;
const downloadGridContainerStyle = css`
	border-collapse: collapse;
	tr {
		&:not(:first-child) {
			td {
				padding-top: 38rem;
			}
		}
	}
	.label {
		color: rgba(255, 255, 255, 0.7) !important;
	}
`;
export { OnboardingSteps };

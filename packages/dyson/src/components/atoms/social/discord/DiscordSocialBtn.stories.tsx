import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { DiscordSocialBtn, DiscordSocialBtnProps } from "./DiscordSocialBtn";
import { css } from "@emotion/react";
import { GithubSocialBtn, GithubSocialBtnProps } from "../github/GithubSocialBtn";
export default {
	title: "Atoms/Social Buttons/DiscordSocialBtn",
	component: DiscordSocialBtn,
} as Meta;
const basicCSS = css`
	width: 300rem;
`;

const Template: Story<DiscordSocialBtnProps> = (args) => <DiscordSocialBtn css={basicCSS} {...args} />;

Template.parameters = {
	status: "beta",
};

export const Primary = Template.bind({});

Primary.parameters = {
	status: "ready",
};
Primary.args = {
	count: 234,
};

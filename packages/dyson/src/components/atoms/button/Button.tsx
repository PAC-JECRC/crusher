import React from "react";
import { css } from '@emotion/react';

export interface ButtonProps {
	/**
	 * Is this the principal call to action on the page?
	 */
	impactLevel?: "high" | "medium" | "low";
	/**
	 * What background color to use
	 */
	bgColor?: "blue" | "pink" | "green" | "tertiary-dark" | "tertiary" | "tertiary-white";
	/**
	 * Size of the component
	 */
	size?: "small" | "medium" | "large";

	/**
	 * Disabled;
	 */
	disabled?: boolean;
	/**
	 * Emotion CSS style if any
	 */
	css?: [string] | string;
	/**
	 * Input contents
	 */
	children: string;
	/**
	 * Optional click handler
	 */
	onClick?: () => void;
	className?: string;
}

/**
 * Unified button component for Dyson UI system
 */
export const Button: React.FC<ButtonProps> = ({ impactLevel = "high", bgColor = "blue", size = "medium", children, className, ...props }) => {
	return (
		<button className={` px-24 text-14 text-white ${className} leading-none`}
						css={[
							buttonCSS,
							blue,
							size==="small" && smallButton,
							size==="large" && largeButton,
							bgColor==="tertiary-dark" &&tertiaryDark

						]}
						{...props} >
			{children}
		</button>
	);
};


const buttonCSS = css`
	cursor: default;
  border-radius: 4rem;
  color: white;
  font-weight: 700;
  height: 32rem;
	span,div{
      font-size: 14rem;
  }
`

const smallButton = css`
  padding: 0 12rem;
	height: 26rem;
  font-weight: 600 !important;
  font-size: 13rem;
`

const largeButton = css`
	box-sizing: border-box;
	border: 1px solid #4675BD;
 	height: 44rem;

  font-weight: 600 ;
  font-size: 14rem;
	width: 348px;
`

const blue = css`
  background-color: #687EF2;

  :hover {
    background-color: #6173D4;
  }
`

const tertiaryDark = css`
  background-color: #1B2028;
  border: 1px solid #2A2E38;


  background-color: #1E242C;
  border: 1px solid #2E3744;
	
  :hover {
    background-color: #1b1d1f;
    border: 1px solid #2A2E38;
  }
`
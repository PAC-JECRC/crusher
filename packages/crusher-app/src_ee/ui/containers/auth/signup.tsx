import { css } from "@emotion/react";
import { Heading } from "dyson/src/components/atoms/heading/Heading";
import { TextBlock } from "dyson/src/components/atoms/textBlock/TextBlock";
import { Text } from "dyson/src/components/atoms/text/Text";
import { Button } from "dyson/src/components/atoms";
import { Input } from "dyson/src/components/atoms";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { loadUserDataAndRedirect } from "@hooks/user";
import { RequestMethod } from "@types/RequestOptions";
import { backendRequest } from "@utils/common/backendRequest";
import { validateEmail, validatePassword, validateName } from "@utils/common/validationUtils";
import { atom, useAtom } from "jotai";
import { Conditional } from "dyson/src/components/layouts";
import { getBoolean } from "@utils/common";
import { LoadingSVG } from "@svg/dashboard";

const RocketImage = (props) => (
    <img
        {...props}
        src={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJBSURBVHgBndJNSJNxHAfw77ZnPcu5Cb4u3yrnzMhMxQyLOnRQC0yJ9NBFSjHo0k0yIuhSmNClCJUOlpGHDpUkmka+5NSp0Wh7Njc3n/a4ILH26rO5t+efGXWaFX3P38/l9/sC/xnRvxbbOjoUyozy0kBUdCzgX3/9V9ja2io9W3O63UsltLz3yXNo1T4YtLN2yZ/QpE5XQDPWye4nTxvSx0aTKpvqUZgFvJxiV8Tbob6+vqP+Ce1Cz9R04QTzEYrkJBTlZcPD2uCxvhuNCzuLy07yGQf651b9ijO8F90aDaovNcNiYTA8NBxJ8OsfUb/KvkzVBXg8u1YIUfXmV1weN/ISWXoxGrtO4KA6G1bWjumpGTCmpTsL49PGLejLT2umvb6H4dgGFiHFiFiFRD6II0UliAoGmPVa6BkOM7Pz8zYHe/eHocj1HHXYFeykXCFwTnhGuBTZ3pIymWZ3Eg6/7cVAmMYnrxMSj8PImJfrvjrMri0YruDvUztiYmGN/nazJ/Mqu7/03vHEIJTd7eiXZ2FOkIOsfXnBuwwXvRzn/n0IQn6OgHt8qNphqmXPN9WRc8oE0pWbFm1JySODO5XLDUD8t324hhKBq4qG3LfJgwY1GaqRDeoU1PNVMYhbhFfxjJhszk5TntojUsoldt1nVJ4SZnJpLKjFsXp6syCIYI8LLbXYI9kIFkUYW1SJgbGlIbaqIC8clCrIegS4kSLgSjxI8RlIhlR0yzW2+IaxRAyNz8C726SmQGqoJssJLbbJd0nz9aMpv90CAAAAAElFTkSuQmCC"
        }
    />
);

const showRegistrationFormAtom = atom(false);

const registerUser = (name: string, email: string, password: string, inviteType: string | null = null, inviteCode: string | null = null) => {
    return backendRequest("/users/actions/signup", {
        method: RequestMethod.POST,
        payload: { email, password, name: name, lastName: "", inviteReferral: inviteType && inviteCode ? { code: inviteCode, type: inviteType } : null },
    });
};

export default function Signup({ nextStepHandler }) {
    const [data] = useState(null);
    const router = useRouter();
    const { query } = router;

    const [, setShowRegistrationBox] = useAtom(showRegistrationFormAtom);
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [name, setName] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false);

    const emailChange = useCallback(
        (e) => {
            setEmail({ ...email, value: e.target.value });
        },
        [email],
    );
    const passwordChange = useCallback(
        (e) => {
            setPassword({ ...password, value: e.target.value });
        },
        [password],
    );
    const nameChange = useCallback(
        (e) => {
            setName({ ...name, value: e.target.value });
        },
        [name],
    );

    const verifyInfo = (completeVerify = false) => {
        const shouldValidateEmail = completeVerify || email.value;
        const shouldValidatePassword = completeVerify || password.value;
        const shouldValidateName = completeVerify || name.value;
        if (!validateEmail(email.value) && shouldValidateEmail) {
            setEmail({ ...email, error: "Please enter valid email" });
        } else setEmail({ ...email, error: "" });

        if (!validatePassword(password.value) && shouldValidatePassword) {
            setPassword({ ...password, error: "Please enter a password with length > 4" });
        } else setPassword({ ...password, error: "" });

        if (!validateName(name.value) && shouldValidateName) {
            setName({ ...name, error: "Please enter a valid name" });
        } else setName({ ...name, error: "" });
    };

    const signupUser = async () => {
        verifyInfo(true);

        if (!validateEmail(email.value) || !validatePassword(name.value) || !validateName(email.value)) return;
        setLoading(true);
        try {
            await registerUser(name.value, email.value, password.value, query?.inviteType?.toString(), query?.inviteCode?.toString());
            nextStepHandler()
        } catch (e: any) {
            console.log(e);
            alert(e.message === "USER_EMAIL_NOT_AVAILABLE" ? "User already registered" : "Some error occurred while registering");
        }
        setLoading(false);
    };

    const signupOnEnter = (event: any) => {
        if (event.key === "Enter") {
            signupUser();
        }
    };

    loadUserDataAndRedirect({ fetchData: false, userAndSystemData: data });
    return (
        <div
            css={css(`
				height: 100vh;
				background: #08090b;
				width: 100vw;
			`)}
        >
            <div className={"flex justify-center"}>
                <div className={"mt-84 flex flex-col items-center"}>
                    <Heading type={1} fontSize={18}>
                        Try crusher for free <RocketImage className={"ml-8"} />
                    </Heading>
                    <TextBlock fontSize={14.2} color={"#E7E7E7"} className={"mt-12"} leading={false}>
                        Million of devs empower their workflow with crusher
                    </TextBlock>

                    <div css={overlayContainer} className={"mt-36 pt-36 pl-32 pr-32"}>
                        <TextBlock fontSize={14} color={"#E7E7E7"} className={"mb-24"}>
                            Create a new account
                        </TextBlock>

                        <div className={" mb-72"}>
                            <div className="mt-20">
                                <Input className='md-20 bg'
                                    autoComplete="name"
                                    value={name.value}
                                    placeholder={"Enter name"}
                                    onChange={nameChange}
                                    isError={name.error}
                                    onBlur={verifyInfo.bind(this, false)}
                                />
                                <Conditional showIf={getBoolean(name.error)}>
                                    <div className={"mt-8 text-12"} css={errorState}>
                                        {name.error}
                                    </div>
                                </Conditional>
                            </div>
                            <div className="mt-20">
                                <Input
                                    className='md-20 bg'
                                    autoComplete="email"
                                    value={email.value}
                                    placeholder={"Enter email"}
                                    onChange={emailChange}
                                    isError={email.error}
                                    onBlur={verifyInfo.bind(this, false)}
                                />
                                <Conditional showIf={getBoolean(email.error)}>
                                    <div className={"mt-8 text-12"} css={errorState}>
                                        {email.error}
                                    </div>
                                </Conditional> />
                            </div>
                            <div className="mt-20">
                                <Input type='password'
                                    value={password.value}
                                    placeholder={"Enter your password"}
                                    type={"password"}
                                    onChange={passwordChange}
                                    onKeyDown={signupOnEnter}
                                    isError={password.error}
                                    onBlur={verifyInfo.bind(this, false)}
                                />
                                <Conditional showIf={getBoolean(password.error)}>
                                    <div className={"mt-8 text-12"} css={errorState}>
                                        {password.error}
                                    </div>
                                </Conditional>
                            </div>
                            <Button
                                onClick={signupUser}
                                className={"flex items-center justify-center mt-30"}
                                disabled={loading}
                                css={css(`
									width: 100%;
									height: 38px;
									font-weight: 400;
                                    background:#905CFF;

								`)}
                            >
                                <div className={"flex justify-center items-center"}>
                                    <Conditional showIf={!loading}>
                                        <Text fontSize={14} weight={900}>
                                            Create an account
                                        </Text>
                                    </Conditional>
                                    <Conditional showIf={loading}>
                                        <span>
                                            {" "}
                                            <LoadingSVG color={"#fff"} height={"16rem"} width={"16rem"} />
                                        </span>
                                        <span className={"mt-2 ml-8"}>Processing</span>
                                    </Conditional>
                                </div>

                            </Button>
                        </div>
                    </div>
                    <div onClick={() => router.push("/login")} className="mt-40">
                        <Text color='#905CFF' weight='800' className={""} fontSize={14}>
                            or go to login
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
}

const overlayContainer = css(`
	background: #0a0b0c;
	border: 1px solid #21252f;
	border-radius: 10px;
	width: 400rem;
	min-height: 200px;
`);

const errorState = css`
	color: #ff4583;
`;
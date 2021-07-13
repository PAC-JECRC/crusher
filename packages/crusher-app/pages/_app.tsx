import React from "react";
import { AppProps } from "next/app";
import "../src/tailwind.css";
import { useBasicSEO } from '../src/hooks/seo';

function App({ Component, pageProps }: AppProps<any>) {
	useBasicSEO({favicon: "/assets/img/favicon.png"})
	return (
		<>
			<Component {...pageProps} />
		</>
	);
}

App.getInitialProps = async () => {
	return {
		pageProps: {},
	};
};

export default App;

import React from "react";
import {Helmet} from "react-helmet";
import {useHead} from "../../contexts/HeadContext";

function Head() {
	const headContext = useHead();
	return (
		<Helmet>
			<meta name="deneme" content="deneme"></meta>
			<title>{headContext.title}</title>
			<link rel="canonical" href="http://mysite.com/example" />
		</Helmet>
	);
}

export default Head;

import React, {useContext, useState} from "react";
import {useEffect} from "react";
import {AuthContext} from "../../contexts/AuthContext";

function Subscribers() {
	const authContext = useContext(AuthContext);
	const [value, setValue] = useState(0);
	useEffect(() => {
		// Subscriberları initalize et
		window.addEventListener("storage", () => {
			authContext.refreshUser();
		});
		window.addEventListener("changeValue", () => {
			setValue(1);
		});
	}, []);
	return <></>;
}

export default Subscribers;

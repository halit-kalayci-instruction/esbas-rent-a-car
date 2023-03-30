import React, {useContext} from "react";
import {useEffect} from "react";
import {AuthContext} from "../../contexts/AuthContext";

function Subscribers() {
	const authContext = useContext(AuthContext);
	useEffect(() => {
		// Subscriberları initalize et
		window.addEventListener("storage", () => {
			authContext.refreshUser();
		});
	}, []);
	return <></>;
}

export default Subscribers;

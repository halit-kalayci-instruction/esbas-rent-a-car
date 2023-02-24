import React, {useEffect} from "react";
import "./Loader.scss";
import {ProgressSpinner} from "primereact/progressspinner";
import {useLoader} from "../../contexts/LoaderContext";
export default function Loader() {
	//LoaderContext
	//useNavigate
	//useLocation
	//useContext(LoaderContext)
	//useLoader

	const loadingState = useLoader();
	useEffect(() => {
		console.log(loadingState);
	}, [loadingState]);
	return (
		<React.Fragment>
			{loadingState.isLoading == true && (
				<div className="loader">
					<ProgressSpinner></ProgressSpinner>
				</div>
			)}
		</React.Fragment>
	);
}

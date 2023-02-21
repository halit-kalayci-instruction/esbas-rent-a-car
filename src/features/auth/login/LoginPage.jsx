import React from "react";
import "./LoginPage.scss";
import {InputText} from "primereact/inputtext";
export default function LoginPage() {
	//TODO: Style
	//TODO: Formik implementation
	//TODO: Service implementation (HTTP REQUEST) axios
	//TODO: Response handling
	return (
		<div className="container">
			<div className="row my-5">
				<div className="col-12 my-2">
					<label>E-mail</label>
					<InputText placeholder="E-mail" />
				</div>
				<div className="col-12 my-2">
					<label>Password</label>
					<InputText placeholder="Password" type="password" />
				</div>
			</div>
		</div>
	);
}

// pre-proccessor

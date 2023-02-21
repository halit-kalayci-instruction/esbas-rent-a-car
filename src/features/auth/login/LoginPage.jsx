import React from "react";
import "./LoginPage.scss";
import {InputText} from "primereact/inputtext";
import {Formik, Form, Field} from "formik";
import {Button} from "primereact/button";
export default function LoginPage() {
	//TODO: Style
	//TODO: Formik implementation
	// Validation schema => YUP
	//TODO: Service implementation (HTTP REQUEST) axios
	//TODO: Response handling

	// initial values => {email:'', password:''}
	// validation schema => yup validation schema
	// onSubmit
	const initialUserCredentials = {email: "", password: ""};
	return (
		<div className="container">
			<Formik
				initialValues={initialUserCredentials}
				onSubmit={values => {
					// kullanıcı butona bastı..
					console.log(values);
				}}
			>
				<Form>
					<div className="row my-5">
						<div className="col-12 my-2">
							<label>E-mail</label>
							{/* <InputText name="email" placeholder="E-mail" /> */}
							<Field className="form-control" name="email" />
						</div>
						<div className="col-12 my-2">
							<label>Password</label>
							{/* <InputText
								name="password"
								placeholder="Password"
								type="password"
							/> */}
							<Field className="form-control" name="password" type="password" />
						</div>
						<div className="col-12 my-2">
							<Button type="submit" label="Login"></Button>
						</div>
					</div>
				</Form>
			</Formik>
		</div>
	);
}

// pre-proccessor

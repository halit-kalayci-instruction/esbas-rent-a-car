import React from "react";
import "./LoginPage.scss";
import {InputText} from "primereact/inputtext";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Button} from "primereact/button";
import * as Yup from "yup";

export default function LoginPage() {
	//TODO: Style
	//TODO: Service implementation (HTTP REQUEST) axios
	//TODO: Response handling

	// initial values => {email:'', password:''}
	// validation schema => yup validation schema
	// onSubmit
	const initialUserCredentials = {email: "", password: ""};
	const loginFormValidationSchema = Yup.object().shape({
		email: Yup.string().required("Email girmek zorunludur."),
		password: Yup.string()
			.required("Şifre zorunludur.")
			.min(3, "Şifre minimum 3 haneli olmalıdır."),
	});
	return (
		<div className="container">
			<Formik
				initialValues={initialUserCredentials}
				validationSchema={loginFormValidationSchema}
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
							<Field className="form-control" name="email" type="email" />
							<div>
								<ErrorMessage name="email">
									{message => (
										<div className="text-danger">HATA: {message}</div>
									)}
								</ErrorMessage>
							</div>
						</div>
						<div className="col-12 my-2">
							<label>Password</label>
							{/* <InputText
								name="password"
								placeholder="Password"
								type="password"
							/> */}
							<Field className="form-control" name="password" type="password" />
							<ErrorMessage
								className="text-danger"
								name="password"
							></ErrorMessage>
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

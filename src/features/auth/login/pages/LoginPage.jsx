import React from "react";
import "./LoginPage.scss";
import {InputText} from "primereact/inputtext";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Button} from "primereact/button";
import * as Yup from "yup";
import {Card} from "primereact/card";
import {Link} from "react-router-dom";
import LoginService from "../services/loginService";
export default function LoginPage() {
	//TODO: Response handling
	//TODO: Show/Hide password

	// initial values => {email:'', password:''}
	// validation schema => yup validation schema
	// onSubmit
	// NEXT.JS
	//JSX => /klasor_adi/dosya_adi.png  => public/

	const initialUserCredentials = {email: "", password: ""};
	const loginFormValidationSchema = Yup.object().shape({
		email: Yup.string().required("Email girmek zorunludur."),
		password: Yup.string()
			.required("Şifre zorunludur.")
			.min(3, "Şifre minimum 3 haneli olmalıdır."),
	});
	const onFormSubmit = values => {
		let loginService = new LoginService();
		loginService
			.login(values)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.error(error);
			});
	};
	return (
		<div className="login-background">
			<div className="row m-0 content  align-items-center">
				<div className="col-md-4 col-0"></div>
				<div className="col-md-3 col-12">
					<Card>
						<h2 className="text-center">Giriş Yap</h2>
						<Formik
							initialValues={initialUserCredentials}
							validationSchema={loginFormValidationSchema}
							onSubmit={values => {
								onFormSubmit(values);
							}}
						>
							<Form>
								<div className="row">
									<div className="col-12 my-2">
										<label>E-mail</label>

										<Field className="form-control" name="email" type="email" />
										<div>
											<ErrorMessage name="email"></ErrorMessage>
										</div>
									</div>
									<div className="col-12 my-2">
										<label>Password</label>

										<Field
											className="form-control"
											name="password"
											type="password"
										/>
										<ErrorMessage
											className="text-danger"
											name="password"
										></ErrorMessage>
									</div>
									<div className="col-12 my-2">
										<Button
											className="w-100"
											type="submit"
											label="Login"
										></Button>
									</div>
								</div>
							</Form>
						</Formik>
						<div className="w-100 text-center">
							<p>
								Don't have account?
								<Link to={"/register"}> Sign Up</Link>
							</p>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}

// pre-proccessor

import React from "react";
import "./LoginPage.scss";
import {InputText} from "primereact/inputtext";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Button} from "primereact/button";
import * as Yup from "yup";
import {Card} from "primereact/card";
import {Link} from "react-router-dom";
export default function LoginPage() {
	//TODO: Style
	//TODO: Service implementation (HTTP REQUEST) axios
	//TODO: Response handling

	// initial values => {email:'', password:''}
	// validation schema => yup validation schema
	// onSubmit
	// NEXT.JS
	const initialUserCredentials = {email: "", password: ""};
	const loginFormValidationSchema = Yup.object().shape({
		email: Yup.string().required("Email girmek zorunludur."),
		password: Yup.string()
			.required("Şifre zorunludur.")
			.min(3, "Şifre minimum 3 haneli olmalıdır."),
	});
	//JSX => /klasor_adi/dosya_adi.png  => public/
	return (
		<div className="login-background">
			<div className="row m-0 content justify-content-center align-items-center">
				<div className="col-3">
					<Card>
						<h2 className="text-center">Giriş Yap</h2>
						<Formik
							initialValues={initialUserCredentials}
							validationSchema={loginFormValidationSchema}
							onSubmit={values => {
								// kullanıcı butona bastı..
								console.log(values);
							}}
						>
							<Form>
								<div className="row">
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
								Don't have acoount?
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

import React, {useContext, useEffect, useState} from "react";
import "./LoginPage.scss";
import {Formik, Form} from "formik";
import {Button} from "primereact/button";
import * as Yup from "yup";
import {Card} from "primereact/card";
import {Link, useNavigate} from "react-router-dom";
import LoginService from "../services/loginService";
import {setItem} from "../../../../core/utils/localStorage";
import BaseInput from "../../../../shared/components/form-elements/base-input/BaseInput";
import {useDispatch} from "react-redux";
import jwt_decode from "jwt-decode";
import {Login} from "../../../../store/actions/authActions";
import {AuthContext} from "../../../../shared/contexts/AuthContext";
export default function LoginPage() {
	// initial values => {email:'', password:''}
	// validation schema => yup validation schema
	// onSubmit
	// NEXT.JS
	//JSX => /klasor_adi/dosya_adi.png  => public/
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authContext = useContext(AuthContext);
	const initialUserCredentials = {email: "", password: ""};
	const loginFormValidationSchema = Yup.object().shape({
		email: Yup.string().required("Email girmek zorunludur."),
		password: Yup.string()
			.required("Şifre zorunludur.")
			.min(3, "Şifre minimum 3 haneli olmalıdır."),
	});
	const onFormSubmit = values => {
		let loginService = new LoginService();
		loginService.login(values).then(response => {
			setItem("token", response.data.accessToken.token);
			let userInfo = jwt_decode(response.data.accessToken.token);
			// dispatch(Login(userInfo));
			authContext.setAuthInformation({authenticated: true, user: userInfo});
			navigate("/homepage");
		});
	};
	const [showPassword, setShowPassword] = useState(false);
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
										<BaseInput label="E-mail" name="email" type="text" />
									</div>
									<div className="col-12 my-2">
										<BaseInput
											label="Password"
											name="password"
											type={showPassword ? "text" : "password"}
											icon={showPassword ? "pi-eye-slash" : "pi-eye"}
											onIconClick={() => {
												setShowPassword(!showPassword);
											}}
										/>
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

import {ErrorMessage, Field} from "formik";
import React from "react";

export default function BaseInput(props) {
	//TODO: Icon?
	return (
		<React.Fragment>
			<label>{props.label}</label>
			<Field className="form-control" name={props.name} type={props.type} />
			<ErrorMessage name={props.name}>
				{msg => <div className="text-danger">{msg}</div>}
			</ErrorMessage>
		</React.Fragment>
	);
}

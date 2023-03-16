import {ErrorMessage, Field} from "formik";
import React from "react";
import "./BaseInput.scss";
export default function BaseInput(props) {
	// default value
	// props = {label:'TR',show:true}
	const {show = true} = props;
	return (
		<>
			<label>{props.label}</label>
			<div className="d-flex justify-content-center flex-direction-row position-relative">
				<Field className="form-control" name={props.name} type={props.type} />
				{props.icon && (
					<i
						onClick={props.onIconClick}
						className={"input-icon pi " + props.icon}
					></i>
				)}
			</div>
			<ErrorMessage name={props.name}>
				{msg => <div className="text-danger">{msg}</div>}
			</ErrorMessage>
		</>
	);
}

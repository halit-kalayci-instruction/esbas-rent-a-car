import {ErrorMessage, Field} from "formik";
import React from "react";

/* {
    "id": 1,
    "brandName": "BMW",
    "fuelName": "Diesel",
    "transmissionName": "Manuel",
    "name": "Series 1",
    "dailyPrice": 2000,
    "imageUrl": "series1.jpg"
  }
*/
// id-brandName-fuelName
// 1 BMW Diesel
//TODO: Fix 1 item problem.
//TODO: Manual Call for Formik
function BaseSelect(props) {
	return (
		<>
			<label>{props.label}</label>
			<Field
				disabled={props.isDisabled}
				className={"form-select " + props.className}
				as="select"
				name={props.name}
				onBlur={e => {
					props.onChange(e);
				}}
			>
				{props.data?.map((opt, index) => (
					<option value={opt[props.valueKey]}>
						{props.nameKeys.map(key => {
							return opt[key] + props.nameDivider;
						})}
					</option>
				))}
			</Field>
			<ErrorMessage name={props.name}>
				{msg => <div className="text-danger text-start">{msg}</div>}
			</ErrorMessage>
		</>
	);
}

export default BaseSelect;

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
function BaseSelect(props) {
	return (
		<>
			<label>{props.label}</label>
			<Field
				className={"form-select " + props.className}
				as="select"
				name={props.name}
			>
				{props.data?.map(opt => (
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

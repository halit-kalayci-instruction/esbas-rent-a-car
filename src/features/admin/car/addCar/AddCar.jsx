import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import BaseSelect from "../../../../shared/components/form-elements/base-select/BaseSelect";
import ModelService from "../../../model/services/modelService";
import {Button} from "primereact/button";
import BaseInput from "../../../../shared/components/form-elements/base-input/BaseInput";
import * as Yup from "yup";
import CarService from "../../../car/services/carService";
import toastr from "toastr";
import {useNavigate} from "react-router-dom";
//TODO: Translate page
function AddCar() {
	const [models, setModels] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetchModels();
	}, []);

	const fetchModels = () => {
		// get models from backend
		let modelService = new ModelService();
		modelService.getAll().then(response => {
			setModels(response.data.items);
		});
	};
	//TODO: Translate
	//TODO: Globalize
	const carStates = [
		{id: 1, label: "Available"},
		{id: 2, label: "Rented"},
		{id: 3, label: "Maintenance"},
	];

	const initialValues = {
		modelId: 0,
		kilometer: 0,
		modelYear: 2010,
		plate: "",
		minFindeksCreditRate: 0,
		carState: 1,
	};

	const validationSchema = Yup.object().shape({
		modelId: Yup.number().required().min(1),
		kilometer: Yup.number().required().min(0),
		modelYear: Yup.number().required().min(2010),
		plate: Yup.string().required().min(7),
		minFindeksCreditRate: Yup.number().required().min(800),
		carState: Yup.number().required().min(1),
	});

	const handleSubmit = values => {
		let carService = new CarService();
		carService.add(values).then(response => {
			// Başarılı bir statü kod
			toastr.success("Araba başarıyla eklendi.");
			navigate("/homepage");
		});
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={values => {
							handleSubmit(values);
						}}
					>
						<Form>
							<BaseSelect
								label="Model Seçiniz"
								name="modelId"
								valueKey="id"
								nameKeys={["id", "brandName", "name"]}
								nameDivider=" "
								data={models}
							></BaseSelect>
							<BaseInput label="Model Yılı" name="modelYear"></BaseInput>
							<BaseInput label="Kilometre" name="kilometer"></BaseInput>
							<BaseInput label="Plaka" name="plate"></BaseInput>
							<BaseInput
								label="Min. Findeks Notu"
								name="minFindeksCreditRate"
							></BaseInput>
							<BaseSelect
								label="Araba Durumu"
								name="carState"
								valueKey="id"
								nameKeys={["label"]}
								nameDivider=" "
								data={carStates}
							></BaseSelect>
							<Button
								className="mt-3 w-100"
								type="submit"
								label="Araba Ekle"
							></Button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default AddCar;

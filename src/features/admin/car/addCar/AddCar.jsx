import React, {useEffect, useState} from "react";
import {Form, Formik, useFormikContext} from "formik";
import BaseSelect from "../../../../shared/components/form-elements/base-select/BaseSelect";
import ModelService from "../../../model/services/modelService";
import {Button} from "primereact/button";
import BaseInput from "../../../../shared/components/form-elements/base-input/BaseInput";
import * as Yup from "yup";
import CarService from "../../../car/services/carService";
import toastr from "toastr";
import {useNavigate, useParams} from "react-router-dom";
import BrandService from "../../../brand/services/brandService";
import {init} from "i18next";
//TODO: Translate page
function AddCar(props) {
	const params = useParams();
	const [models, setModels] = useState([]);
	const [brands, setBrands] = useState([]);
	const [isUpdating, setIsUpdating] = useState(false);
	const [carToUpdate, setCarToUpdate] = useState({});
	const [initialValues, setInitialValues] = useState({
		id: 0,
		brandId: 0,
		modelId: 0,
		kilometer: 0,
		modelYear: 2010,
		plate: "",
		minFindeksCreditRate: 800,
		carState: 1,
	});
	const [selectedBrandId, setSelectedBrandId] = useState(0);
	const navigate = useNavigate();
	useEffect(() => {
		if (params.id) {
			setIsUpdating(true);
			fetchCarInfo();
		}
		fetchModels();
	}, []);

	useEffect(() => {
		if (carToUpdate.id) {
			setSelectedBrandId(carToUpdate.brandId);
			setInitialValues({
				id: carToUpdate.id,
				brandId: carToUpdate.brandId,
				modelId: carToUpdate.modelId,
				kilometer: carToUpdate.kilometer,
				modelYear: carToUpdate.modelYear,
				plate: carToUpdate.plate,
				minFindeksCreditRate: carToUpdate.minFindeksCreditRate,
				carState: carToUpdate.carState,
			});
		}
	}, [carToUpdate]);

	useEffect(() => {
		if (models.length > 0) fetchBrands();
	}, [models]);

	const fetchCarInfo = () => {
		let carService = new CarService();
		carService.getById(params.id).then(response => {
			console.log(response.data);
			setCarToUpdate(response.data);
		});
	};

	const fetchModels = () => {
		// get models from backend
		let modelService = new ModelService();
		modelService.getAll().then(response => {
			setModels(response.data.items);
		});
	};

	const fetchBrands = () => {
		let brandService = new BrandService();
		brandService.getAll().then(response => {
			setBrands(response.data.items);
		});
	};

	//TODO: Translate
	//TODO: Globalize
	const carStates = [
		{id: 1, label: "Available"},
		{id: 2, label: "Rented"},
		{id: 3, label: "Maintenance"},
	];

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
		if (isUpdating) {
			carService.update(values).then(response => {
				// Başarılı bir statü kod
				toastr.success("Araba başarıyla güncellendi.");
				navigate("/homepage");
			});
		} else {
			carService.add(values).then(response => {
				// Başarılı bir statü kod
				toastr.success("Araba başarıyla eklendi.");
				navigate("/homepage");
			});
		}
	};
	//TODO: Fix 1 select
	const FormObserver = () => {
		// FormikContext
		const {values, setFieldValue, setFieldTouched, touched} =
			useFormikContext();
		useEffect(() => {
			setSelectedBrandId(values.brandId);
			//formikteki modelId=0
			if (isUpdating == false || (touched.brandId && touched.brandId == true)) {
				setFieldValue("modelId", 0);
				setFieldTouched("modelId", false);
			}
			//touched
		}, [values.brandId]);
		return null;
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						enableReinitialize
						onSubmit={values => {
							handleSubmit(values);
						}}
					>
						<Form>
							<FormObserver></FormObserver>
							<BaseSelect
								label="Marka Seçiniz"
								name="brandId"
								valueKey="id"
								nameKeys={["name"]}
								nameDivider=""
								data={brands}
							/>
							<BaseSelect
								isDisabled={
									selectedBrandId > 0 &&
									models.filter(i => i.brandId == selectedBrandId).length > 0
										? false
										: true
								}
								label="Model Seçiniz"
								name="modelId"
								valueKey="id"
								nameKeys={["id", "brandName", "name"]}
								nameDivider=" "
								data={models.filter(i => i.brandId == selectedBrandId)}
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
								label={isUpdating ? "Arabayı Güncelle" : "Araba Ekle"}
							></Button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default AddCar;

import React, {useContext, useEffect, useState} from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";
import CarService from "../../../features/car/services/carService";
import "./Homepage.scss";
import Pagination from "../../components/pagination/Pagination";
import {useDispatch} from "react-redux";
import BrandService from "../../../features/brand/services/brandService";
import {AuthContext} from "../../contexts/AuthContext";
import {Form, Formik} from "formik";
import BaseInput from "../../components/form-elements/base-input/BaseInput";
import BaseSelect from "../../components/form-elements/base-select/BaseSelect";

import {Button} from "primereact/button";

//TODO: Marka ve modelleri fetch edip filtreleme formuna gönder.
export default function Homepage() {
	// Redux
	const authContext = useContext(AuthContext);
	const [data, setData] = useState({});
	const [pageSize, setpageSize] = useState(1);
	const dispatch = useDispatch();
	const i = 0;

	// { modelId:6, minKilometer:500, maxModelYear:2021 }

	const testDynamic = () => {
		// {field:"modelId", operator:"eq", value:"6"}
		// {field:"kilometer",operator:"gt",value:100}
		// {field:"kilometer",operator:"lt",value:600}
		let object = {
			modelId: {fieldName: "ModelId", operator: "eq", value: "6"},
			MinKilometer: {fieldName: "Kilometer", operator: "gt", value: "500"},
			MaxKilometer: {fieldName: "Kilometer", operator: "lt", value: "5000"},
			ModelYear: {fieldName: "ModelYear", operator: "eq", value: "3000"},
		};

		let obj2 = {
			field: "modelId",
			value: object.modelId.value,
			operator: "eq",
			logic: "and",
			filters: [],
		};

		for (const [key, value] of Object.entries(object)) {
			// obj2 = {...obj2, filters: [...filters, {}]};
			obj2.filters.push({
				field: value.fieldName,
				value: value.value,
				operator: value.operator,
			});
		}
		console.log(obj2);
	};

	useEffect(() => {
		testDynamic();
	}, []);

	useEffect(() => {
		fetchCarData();
		//fetchBrandData();
	}, [pageSize]);
	// Circular Hook Call

	// <a1235>
	// <b67845>
	const fetchCarData = (page = 0) => {
		let carService = new CarService();
		carService.getAll(page, pageSize).then(response => {
			console.log("Araba bilgileri getirildi: " + response);
			setData(response.data);
		});
	};
	const fetchBrandData = () => {
		let brandService = new BrandService();
		brandService.getAll().then(response => {
			console.log("brandservice");
		});
	};

	// 2 -> 11
	const setPage = page => {
		fetchCarData(page);
	};
	const setPageSize = pageSize => {
		setpageSize(+pageSize);
	};

	return (
		<div className="container">
			<div className="row mt-3">
				<div className="col-12 mb-2">
					<Formik
						initialValues={{
							modelYear: undefined,
							plate: "",
							minKilometer: undefined,
							maxKilometer: undefined,
						}}
						onSubmit={formValues => {
							let obj = {
								field: "ModelYear",
								operator: "eq",
								value: formValues.modelYear,
								logic: "and",
								filters: [
									{
										field: "Kilometer",
										operator: "gt",
										value: formValues.minKilometer,
									},
									{
										field: "Kilometer",
										operator: "lt",
										value: formValues.maxKilometer,
									},
								],
							};
							console.log(obj);
							let carService = new CarService();
							carService
								.getAllDynamic({page: 0, pageSize: 20}, {filter: obj})
								.then(response => console.log(response));
						}}
					>
						<Form>
							<div className="row">
								{/* <div className="col-2">
									<BaseSelect label="Model" name="modelId" data></BaseSelect>
								</div> */}
								<div className="col-2">
									<BaseInput label="Model Yılı" name="modelYear"></BaseInput>
								</div>
								<div className="col-2">
									<BaseInput label="Plaka" name="plate"></BaseInput>
								</div>
								<div className="col-2">
									<BaseInput label="Min. KM" name="minKilometer"></BaseInput>
								</div>
								<div className="col-2">
									<BaseInput label="Max. KM" name="maxKilometer"></BaseInput>
								</div>
								<div className="col-3">
									<Button type="submit" className="mt-2">
										Filtrele
									</Button>
								</div>
							</div>
						</Form>
					</Formik>
				</div>
				{data?.items?.map(car => (
					<div key={car.id} className="col-12 mb-2 col-md-3">
						<CarCard car={car}></CarCard>
					</div>
				))}
			</div>
			<Pagination
				hasPrevious={data.hasPrevious}
				hasNext={data.hasNext}
				pages={data.pages}
				index={data.index}
				onPageChange={setPage}
				onPageSizeChange={setPageSize}
			></Pagination>
			{/* <Hooks /> */}
		</div>
	);
}

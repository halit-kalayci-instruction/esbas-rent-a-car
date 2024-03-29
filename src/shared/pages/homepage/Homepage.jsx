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
import instance from "../../../core/utils/axiosInterceptors";
import {Helmet} from "react-helmet";
import {useHead} from "../../contexts/HeadContext";

export default function Homepage() {
	// Redux
	const authContext = useContext(AuthContext);
	const head = useHead();
	const [data, setData] = useState({});
	const [brandData, setBrandData] = useState({});
	const [pageSize, setpageSize] = useState(1);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const i = 0;

	head.setTitle("Ana Sayfa");
	// { modelId:6, minKilometer:500, maxModelYear:2021 }

	const translateDynamic = object => {
		// {field:"modelId", operator:"eq", value:"6"}
		// {field:"kilometer",operator:"gt",value:100}
		// {field:"kilometer",operator:"lt",value:600}

		let obj2 = {
			field: "Model.Brand.Id",
			value: object.Model.Brand.Id,
			operator: "eq",
			logic: "and",
			filters: [],
		};

		let filtersToUse = {...object, Model: undefined};

		for (const [key, value] of Object.entries(filtersToUse)) {
			if (!value || value == "" || value < 0) continue;
			obj2.filters.push({
				field: key,
				value: value,
				operator: "eq",
			});
		}
		console.log(obj2);
		return obj2;
	};

	useEffect(() => {
		console.log(brandData);
	}, brandData);

	useEffect(() => {
		fetchCarData();
		fetchBrandData();
	}, [pageSize]);

	useEffect(() => {
		timeoutLoader();
	});
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
			setBrandData(response.data);
			console.log(response.data);
		});
	};

	// 2 -> 11
	const setPage = page => {
		fetchCarData(page);
	};
	const setPageSize = pageSize => {
		setpageSize(+pageSize);
	};

	const timeoutLoader = () => {
		// Sayfa initlerinde
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	};

	return loading ? (
		<div>Loading</div>
	) : (
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
							let obj = translateDynamic(formValues);
							let carService = new CarService();
							carService
								.getAllDynamic({page: 0, pageSize: 20}, {filter: obj})
								.then(response => {
									console.log(response);
									setData(response.data);
								});
						}}
					>
						<Form>
							<div className="row">
								<div className="col-2">
									{brandData && (
										<BaseSelect
											label="Marka"
											name="Model.Brand.Id"
											data={brandData.items}
											nameKeys={["name"]}
											valueKey="id"
											nameDivider=""
										></BaseSelect>
									)}
								</div>
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
				pageSizes={[1, 2, 3]}
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

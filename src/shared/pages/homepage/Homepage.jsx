import React, {useContext, useEffect, useState} from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";
import CarService from "../../../features/car/services/carService";
import "./Homepage.scss";
import {LoaderContext} from "../../contexts/LoaderContext";
import Pagination from "../../components/pagination/Pagination";
import BrandService from "../../../features/brand/services/brandService";
import {useDispatch} from "react-redux";
import {Login} from "../../../store/actions/authActions";

export default function Homepage() {
	// Redux
	const [data, setData] = useState({});
	const dispatch = useDispatch();
	useEffect(() => {
		fetchCarData();
	}, []);
	// Circular Hook Call

	//TODO: User select for page size
	const fetchCarData = (page = 0) => {
		let carService = new CarService();
		carService.getAll(page, 1).then(response => {
			console.log("Araba bilgileri getirildi: " + response);
			setData(response.data);
		});
	};

	const setPage = page => {
		fetchCarData(page);
	};

	const changeStateOnRedux = () => {
		//Redux aksiyonları nasıl çağrılır?
		//dispatch
		dispatch(Login({name: "deneme", email: "123"}));
	};

	return (
		<div className="container">
			<div className="row mt-3">
				{data?.items?.map(car => (
					<div className="col-12 mb-2 col-md-3">
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
			></Pagination>

			<button
				onClick={() => {
					changeStateOnRedux();
				}}
				className="btn btn-danger"
			>
				Auth State'i Değiştir
			</button>
		</div>
	);
}

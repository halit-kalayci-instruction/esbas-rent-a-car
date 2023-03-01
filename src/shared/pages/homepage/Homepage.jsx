import React, {useContext, useEffect, useState} from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";
import CarService from "../../../features/car/services/carService";
import "./Homepage.scss";
import {LoaderContext} from "../../contexts/LoaderContext";
import Pagination from "../../components/pagination/Pagination";

export default function Homepage() {
	//TODO: Pagination
	// Redux
	const [data, setData] = useState({});
	useEffect(() => {
		// Backendden araba bilgilerini getirme
		fetchCarData();
	}, []);
	// Circular Hook Call

	//TODO: User select for page size
	const fetchCarData = (page = 0) => {
		let carService = new CarService();
		carService.getAll(page, 1).then(response => {
			setData(response.data);
		});
	};

	const setPage = page => {
		fetchCarData(page);
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
		</div>
	);
}

import React, {useEffect, useState} from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";
import CarService from "../../../features/car/services/carService";
import "./Homepage.scss";
import Pagination from "../../components/pagination/Pagination";

export default function Homepage() {
	// Redux
	const [data, setData] = useState({});
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

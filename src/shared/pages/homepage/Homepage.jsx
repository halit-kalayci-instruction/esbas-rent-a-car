import React, {useEffect, useState} from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";
import CarService from "../../../features/car/services/carService";

export default function Homepage() {
	//TODO: Pagination
	// Redux
	const [cars, setCars] = useState([]);
	const [pagination, setPagination] = useState({index: 0});
	useEffect(() => {
		// Backendden araba bilgilerini getirme
		let carService = new CarService();
		carService.getAll(pagination.index, 1).then(response => {
			// Gelen cevabı ekrana yazdırma
			setCars(response.data.items);
			setPagination(response.data);
			console.log(pagination);
		});
	}, [pagination]);

	const setPage = page => {};

	return (
		<div className="container">
			<div className="row mt-3">
				{cars.map(car => (
					<div className="col-12 mb-2 col-md-3">
						<CarCard car={car}></CarCard>
					</div>
				))}
			</div>
			<nav aria-label="Page navigation example">
				<ul className="pagination">
					{pagination.hasPrevious && (
						<li className="page-item">
							<a className="page-link">Previous</a>
						</li>
					)}
					{[...Array(pagination.pages)].map((page, index) => (
						<li
							className={
								"page-item " + (pagination.index == index ? "active" : "")
							}
						>
							<a className="page-link">{index + 1}</a>
						</li>
					))}
					{pagination.hasNext && (
						<li className="page-item">
							<a className="page-link">Next</a>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
}

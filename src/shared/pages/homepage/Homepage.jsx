import React, {useEffect, useState} from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";
import CarService from "../../../features/car/services/carService";
import "./Homepage.scss";

export default function Homepage() {
	//TODO: Pagination
	// Redux
	const [cars, setCars] = useState([]);
	const [pagination, setPagination] = useState({});
	useEffect(() => {
		// Backendden araba bilgilerini getirme
		fetchCarData();
	}, []);
	// Circular Hook Call

	//TODO: User select for page size
	const fetchCarData = (page = 0) => {
		let carService = new CarService();
		carService.getAll(page, 1).then(response => {
			setCars(response.data.items);
			setPagination(response.data);
		});
	};

	const setPage = page => {
		fetchCarData(page);
	};

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
							<a
								onClick={() => {
									setPage(pagination.index - 1);
								}}
								className="page-link"
							>
								Previous
							</a>
						</li>
					)}
					{[...Array(pagination.pages)].map((page, index) => (
						<li
							className={
								"page-item " + (pagination.index == index ? "active" : "")
							}
						>
							<a
								onClick={() => {
									setPage(index);
								}}
								className="page-link"
							>
								{index + 1}
							</a>
						</li>
					))}
					{pagination.hasNext && (
						<li className="page-item">
							<a
								onClick={() => {
									setPage(pagination.index + 1);
								}}
								className="page-link"
							>
								Next
							</a>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
}

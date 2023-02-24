import React, {useEffect, useState} from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";
import CarService from "../../../features/car/services/carService";

export default function Homepage() {
	//TODO: Pagination
	const [cars, setCars] = useState([]);
	useEffect(() => {
		// Backendden araba bilgilerini getirme
		let carService = new CarService();
		carService.getAll().then(response => {
			// Gelen cevabı ekrana yazdırma
			console.log(response);
			setCars(response.data.items);
		});
	}, []);
	return (
		<div className="container">
			<div className="row mt-3">
				{cars.map(car => (
					<div className="col-12 mb-2 col-md-3">
						<CarCard car={car}></CarCard>
					</div>
				))}
			</div>
		</div>
	);
}

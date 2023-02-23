import React from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";

export default function Homepage() {
	//TODO: Pagination
	return (
		<div className="container">
			<div className="row mt-3">
				<div className="col-12 mb-2 col-md-3">
					<CarCard brand="BMW" model="520"></CarCard>
				</div>
				<div className="col-12 mb-2 col-md-3">
					<CarCard brand="Fiat" model="Egea"></CarCard>
				</div>
				<div className="col-12 mb-2 col-md-3">
					<CarCard brand="Ford" model="Focus"></CarCard>
				</div>
				<div className="col-12 mb-2 col-md-3">
					<CarCard brand="Alfa Romeo" model="520"></CarCard>
				</div>
			</div>
		</div>
	);
}

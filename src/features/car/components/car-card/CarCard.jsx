import React from "react";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
export default function CarCard(props) {
	//TODO: Add carousel.
	const header = (
		<img
			alt="Card"
			src="https://primefaces.org/cdn/primereact/images/usercard.png"
		/>
	);
	const footer = (
		<div className="w-100">
			<Button className="w-100" label="Kirala" icon="pi pi-shopping-cart" />
		</div>
	);

	return (
		<div className="card flex justify-content-center">
			<Card footer={footer} header={header} className="md:w-25rem">
				<h3>{props.brand}</h3>
				<h5>{props.model}</h5>
				<Divider />
				<p className="m-0">{props.description}</p>
				<Divider />
				<div className="row">
					<div className="col-3">
						<div className="d-flex justify-content-center align-items-center flex-column">
							<i className="pi pi-car"></i>
							BMW x5
						</div>
					</div>
					<div className="col-3">
						<div className="d-flex justify-content-center align-items-center flex-column">
							<i className="pi pi-clock"></i>
							2021
						</div>
					</div>
					<div className="col-3">
						<div className="d-flex justify-content-center align-items-center flex-column">
							<i className="pi pi-car"></i>
							BMW x5
						</div>
					</div>
					<div className="col-3">
						<div className="d-flex justify-content-center align-items-center flex-column">
							<i className="pi pi-car"></i>
							BMW x5
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}

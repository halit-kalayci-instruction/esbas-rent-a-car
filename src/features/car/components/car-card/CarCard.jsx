import React, {useEffect} from "react";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import {useTranslation} from "react-i18next";
import {BASE_CDN_URL} from "../../../../enviroment";
export default function CarCard(props) {
	const {t} = useTranslation();

	useEffect(() => {
		console.log(props.car);
	}, []);

	//TODO: Add carousel.
	const header = props.car.images.length > 0 && (
		<img alt="Card" src={BASE_CDN_URL + props.car.images[0].path} />
	);
	const footer = (
		<div className="w-100">
			<Button className="w-100" label={t("rent")} icon="pi pi-shopping-cart" />
		</div>
	);

	//TODO: Backend'e image ve özellikler ekle.
	return (
		<div className="card flex justify-content-center">
			<Card footer={footer} header={header} className="md:w-25rem">
				<h3>{props.car.brandName}</h3>
				<h5>{props.car.modelName}</h5>
				<Divider />
				<div className="row">
					<div className="col-3">
						<div className="d-flex justify-content-center align-items-center flex-column">
							<i className="pi pi-car"></i>
							{props.car.plate}
						</div>
					</div>
					<div className="col-3">
						<div className="d-flex justify-content-center align-items-center flex-column">
							<i className="pi pi-clock"></i>
							{props.car.modelYear}
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
				<Divider />
			</Card>
		</div>
	);
}

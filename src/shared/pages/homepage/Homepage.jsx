import React, {useContext, useEffect, useState} from "react";
import CarCard from "../../../features/car/components/car-card/CarCard";
import CarService from "../../../features/car/services/carService";
import "./Homepage.scss";
import Pagination from "../../components/pagination/Pagination";
import {useDispatch} from "react-redux";
import {getAllCars, getAllCarsAsync} from "../../../store/actions/carActions";
import BrandService from "../../../features/brand/services/brandService";
import {AuthContext} from "../../contexts/AuthContext";

export default function Homepage() {
	// Redux
	const authContext = useContext(AuthContext);
	const [data, setData] = useState({});
	const [pageSize, setpageSize] = useState(1);
	const dispatch = useDispatch();
	useEffect(() => {
		fetchCarData();
		//fetchBrandData();
	}, [pageSize]);
	// Circular Hook Call

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
			console.log("brandservice");
		});
	};

	const setPage = page => {
		fetchCarData(page);
	};
	const setPageSize = pageSize => {
		setpageSize(+pageSize);
	};

	return (
		<div className="container">
			<div className="row mt-3">
				{data?.items?.map(car => (
					<div key={car.id} className="col-12 mb-2 col-md-3">
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
				onPageSizeChange={setPageSize}
			></Pagination>
		</div>
	);
}

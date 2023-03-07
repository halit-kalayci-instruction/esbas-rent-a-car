import {Button} from "primereact/button";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import CarService from "../../../car/services/carService";
import Pagination from "../../../../shared/components/pagination/Pagination";
function CarList() {
	// O anki (sayfa) araba verilerini tabloya aktar.
	// Her bir satır için düzenle/sil butonlarının click aksiyonunu ata
	// Listelemeye genel bir search ekle
	// Tabloda gösterilen alanlar editable olsun.
	// Silmek için modal oluştur.
	const {t} = useTranslation();

	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState({page: 0, pageSize: 1});

	useEffect(() => {
		fetchCars();
	}, [pagination]);

	const fetchCars = () => {
		let carService = new CarService();
		carService.getAll(pagination.page, pagination.pageSize).then(response => {
			setData(response.data);
		});
	};

	const setPage = page => {
		setPagination({page: page, pageSize: pagination.pageSize});
	};
	const setPageSize = pageSize => {
		setPagination({page: pagination.page, pageSize: pageSize});
	};

	return (
		<div className="container mt-3">
			<h3>{t("car.panel")}</h3>
			<Button label={t("add.car")}></Button>
			<div className="row mt-3">
				<div className="col-12">
					<DataTable value={data.items}>
						<Column field="id" header="ID"></Column>
						<Column field="brandName" header="Brand Name"></Column>
						<Column field="modelName" header="Model Name"></Column>
						<Column field="plate" header="Plate"></Column>
					</DataTable>
				</div>
				<div className="col-12 mt-3">
					<Pagination
						hasPrevious={data.hasPrevious}
						hasNext={data.hasNext}
						pages={data.pages}
						index={data.index}
						onPageChange={setPage}
						onPageSizeChange={setPageSize}
					></Pagination>
				</div>
			</div>
		</div>
	);
}

export default CarList;

import {Button} from "primereact/button";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import CarService from "../../../car/services/carService";
import Pagination from "../../../../shared/components/pagination/Pagination";
import {Dialog} from "primereact/dialog";
import toastr from "toastr";
import {useNavigate} from "react-router-dom";
function CarList() {
	// Her bir satır için düzenle/sil butonlarının click aksiyonunu ata
	// Listelemeye genel bir search ekle
	// Tabloda gösterilen alanlar editable olsun.
	// Silmek için modal oluştur.
	const {t} = useTranslation();
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState({page: 0, pageSize: 1});
	const [visible, setVisible] = useState(false);
	const [carToDelete, setCarToDelete] = useState({});

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
		setPagination({page: 0, pageSize: pageSize});
	};

	const deleteCar = car => {
		setCarToDelete(car);
		setVisible(true);
	};

	const confirmDelete = () => {
		let carService = new CarService();
		carService.delete(carToDelete.id).then(response => {
			setVisible(false);
			toastr.success("Araba başarıyla silindi.");
			//fetchCars(); => Tekrar veritabanından bilgileri çek
			// data = { hasPrevious:false, hasNext:true, index:0, pageSize:10, items:[] }
			setData({...data, items: data.items.filter(i => i.id != carToDelete.id)}); // => Zaten silindi, memoryde silme işlemi gerçekleştir.
		});
	};

	const buttonsTemplate = car => {
		return (
			<>
				<Button label="Düzenle" severity="warning"></Button>
				<Button
					onClick={() => deleteCar(car)}
					className="mx-2"
					label="Sil"
					severity="danger"
				></Button>
			</>
		);
	};

	return (
		<div className="container mt-3">
			<h3>{t("car.panel")}</h3>
			<Button
				label={t("add.car")}
				onClick={() => navigate("/car/add")}
			></Button>
			<div className="row mt-3">
				<div className="col-12">
					<DataTable value={data.items}>
						<Column field="id" header="ID"></Column>
						<Column field="brandName" header="Brand Name"></Column>
						<Column field="modelName" header="Model Name"></Column>
						<Column field="plate" header="Plate"></Column>
						<Column header="Actions" body={buttonsTemplate}></Column>
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

			<Dialog
				header="DİKKAT!"
				visible={visible}
				style={{width: "50vw"}}
				onHide={() => setVisible(false)}
			>
				<p className="m-0">
					#{carToDelete.id} numaralı {carToDelete.plate} plaka nolu{" "}
					{carToDelete.brandName} {carToDelete.modelName} aracını silmek
					istediğinize emin misiniz?
				</p>
				<div className="mt-2 w-100 justify-content-end align-items-end text-end">
					<Button
						onClick={() => setVisible(false)}
						label="İptal"
						severity="secondary"
					></Button>
					<Button
						onClick={() => confirmDelete()}
						className="mx-3"
						label="Sil"
						severity="danger"
					></Button>
				</div>
			</Dialog>
		</div>
	);
}

export default CarList;

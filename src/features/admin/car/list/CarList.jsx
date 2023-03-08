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
import {InputText} from "primereact/inputtext";
import ModelService from "../../../model/services/modelService";
import {Dropdown} from "primereact/dropdown";
import {Tag} from "primereact/tag";
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
	const [models, setModels] = useState([]);

	useEffect(() => {
		fetchCars();
		fetchModels();
	}, [pagination]);

	const fetchModels = () => {
		let modelService = new ModelService();
		modelService.getAll().then(response => {
			setModels(response.data.items);
		});
	};

	const fetchCars = () => {
		let carService = new CarService();
		carService.getAll(pagination.page, pagination.pageSize).then(response => {
			setData(response.data);
			console.log(response.data);
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
			// fetchCars(); => Tekrar veritabanından bilgileri çek
			// data = { hasPrevious:false, hasNext:true, index:0, pageSize:10, items:[] }
			setData({...data, items: data.items.filter(i => i.id != carToDelete.id)}); // => Zaten silindi, memoryde silme işlemi gerçekleştir.
		});
	};

	const buttonsTemplate = car => {
		return (
			<>
				<Button
					onClick={() => navigate("/car/update/" + car.id)}
					label="Düzenle"
					severity="warning"
				></Button>
				<Button
					onClick={() => deleteCar(car)}
					className="mx-2"
					label="Sil"
					severity="danger"
				></Button>
			</>
		);
	};

	const rowEdit = edit => {
		const updateData = {...edit.newData, modelId: edit.newData.modelName};
		let carService = new CarService();
		carService.update(updateData).then(response => {
			toastr.success("Araba başarıyla güncellendi..");
			fetchCars();
		});
	};

	const TextEditor = options => {
		return (
			<InputText
				type="text"
				value={options.value}
				onChange={e => options.editorCallback(e.target.value)}
			/>
		);
	};
	//TODO: Select box change action
	const ModelSelector = options => {
		console.log(options);
		return (
			// <select
			// 	className="form-select"
			// 	value={options.value}
			// 	onChange={e => options.editorCallback(e.value)}
			// >
			// 	{models.map(model => (
			// 		<option value={model.name}>{model.name}</option>
			// 	))}
			// </select>

			<Dropdown
				value={options.rowData.modelName}
				options={models}
				onChange={e => {
					options.editorCallback(e.value.id);
				}}
				placeholder="Select a Model"
				itemTemplate={option => {
					return <Tag value={option.name}></Tag>;
				}}
			/>
		);
	};

	//TODO: Actions with row editor, row editor icons
	return (
		<div className="container mt-3">
			<h3>{t("car.panel")}</h3>
			<Button
				label={t("add.car")}
				onClick={() => navigate("/car/add")}
			></Button>
			<div className="row mt-3">
				<div className="col-12">
					<DataTable
						value={data.items}
						editMode="row"
						dataKey="id"
						onRowEditComplete={rowEdit}
					>
						<Column field="id" header="ID"></Column>
						<Column field="brandName" header="Brand Name"></Column>
						<Column
							field="modelName"
							header="Model Name"
							editor={options => ModelSelector(options)}
						></Column>
						<Column
							field="plate"
							header="Plate"
							editor={options => TextEditor(options)}
						></Column>
						<Column
							field="kilometer"
							header="Kilometer"
							editor={options => TextEditor(options)}
						></Column>
						<Column
							field="modelYear"
							header="Model Year"
							editor={options => TextEditor(options)}
						></Column>
						<Column header="Actions" body={buttonsTemplate}></Column>
						<Column
							rowEditor
							headerStyle={{width: "10%", minWidth: "8rem"}}
							bodyStyle={{textAlign: "center"}}
						></Column>
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

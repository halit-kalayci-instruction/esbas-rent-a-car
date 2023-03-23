import {Button} from "primereact/button";
import React, {useContext, useEffect, useState} from "react";
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
import {AuthContext} from "../../../../shared/contexts/AuthContext";
import {userHasRole} from "../../../../shared/utils/auth-status/AuthStatus";
import {FilterMatchMode, FilterOperator} from "primereact/api";
import {Slider} from "primereact/slider";
import {translateFilterToBackend} from "../../../../core/utils/dataTableExtensions";
function CarList() {
	// Her bir satır için düzenle/sil butonlarının click aksiyonunu ata
	// Listelemeye genel bir search ekle
	// Tabloda gösterilen alanlar editable olsun.
	// Silmek için modal oluştur.
	const authContext = useContext(AuthContext);
	const {t} = useTranslation();
	const navigate = useNavigate();

	const [data, setData] = useState([]);
	const [pagination, setPagination] = useState({page: 0, pageSize: 1});
	const [visible, setVisible] = useState(false);
	const [carToDelete, setCarToDelete] = useState({});
	const [models, setModels] = useState([]);
	const [modelChanged, setModelChanged] = useState(false);
	const [filters, setFilters] = useState(null);
	const [backendFilter, setBackendFilter] = useState({});

	useEffect(() => {
		fetchCarsWithFilters(backendFilter);
		fetchModels();
	}, [pagination]);

	useEffect(() => {
		initFilters();
	}, []);

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
					disabled={!userHasRole(["Cars.Update", "Admin"])}
					onClick={() => {
						navigate("/car/update/" + car.id);
					}}
					label="Düzenle"
					severity="warning"
				></Button>
				<Button
					disabled={!authContext.hasPermission(["Cars.Delete"])}
					onClick={() => deleteCar(car)}
					className="mx-2"
					label="Sil"
					severity="danger"
				></Button>
			</>
		);
	};

	const rowEdit = edit => {
		const updateData = {
			...edit.newData,
			modelId: modelChanged
				? edit.newData.modelName
				: data.items.find(i => i.id == edit.newData.id).modelId,
		};
		let carService = new CarService();
		carService.update(updateData).then(response => {
			toastr.success("Araba başarıyla güncellendi..");
			fetchCarsWithFilters(backendFilter);
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

	const getSelectedModelName = id => {
		if (models.length <= 0) return "";
		return models.find(c => c.id == id)?.name;
	};

	const ModelSelector = options => {
		console.log(options);
		return (
			<select
				className="form-select"
				onChange={e => {
					setModelChanged(true);
					options.editorCallback(e.target.value);
				}}
				value={
					modelChanged
						? options.rowData.modelName
						: options.rowData.modelId
						? options.rowData.modelId
						: data.items.find(i => i.id == edit.newData.id).modelId
				}
			>
				{models.map(model => (
					<option value={model.id}>
						{model.id}-{model.brandName}-{model.name}
					</option>
				))}
			</select>
		);
	};

	const initFilters = () => {
		setFilters({
			"Model.Brand.Name": {
				operator: FilterOperator.AND,
				constraints: [{value: null, matchMode: FilterMatchMode.CONTAINS}],
			},
			"Model.Name": {
				operator: FilterOperator.AND,
				constraints: [{value: null, matchMode: FilterMatchMode.CONTAINS}],
			},
			plate: {
				operator: FilterOperator.AND,
				constraints: [{value: null, matchMode: FilterMatchMode.CONTAINS}],
			},
			kilometer: {value: null, matchMode: FilterMatchMode.BETWEEN},
		});
	};

	const filterKilometerTemplate = options => {
		return (
			<>
				<Slider
					min={1000}
					max={10000}
					value={options.value}
					onChange={e => options.filterCallback(e.value)}
					range
					className="m-3"
				></Slider>
				<div className="flex align-items-center justify-content-between px-2">
					<span>{options.value ? options.value[0] : 0} -</span>
					<span> {options.value ? options.value[1] : 100}</span>
				</div>
			</>
		);
	};

	const fetchCarsWithFilters = filter => {
		let carService = new CarService();
		carService.getAllDynamic(pagination, filter).then(response => {
			setData(response.data);
		});
	};

	const translateFilter = filterObject => {
		let backendFilterObj = translateFilterToBackend(filterObject);
		let object = {};
		if (backendFilterObj.field) {
			object = {filter: backendFilterObj};
		}
		setBackendFilter(object);
		fetchCarsWithFilters(object);
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
						filters={filters}
						onFilter={translateFilter}
					>
						<Column field="id" header="ID"></Column>
						<Column
							field="brandName"
							filter
							filterField="Model.Brand.Name"
							header="Brand Name"
						></Column>
						<Column
							field="modelName"
							header="Model Name"
							filterField="Model.Name"
							filter
							editor={options => ModelSelector(options)}
						></Column>
						<Column
							field="plate"
							header="Plate"
							filter
							editor={options => TextEditor(options)}
						></Column>
						<Column
							field="kilometer"
							header="Kilometer"
							filter
							showFilterMatchModes={false}
							filterElement={filterKilometerTemplate}
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

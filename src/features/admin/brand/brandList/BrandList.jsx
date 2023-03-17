import React, {useEffect, useState} from "react";
import BrandService from "../../../brand/services/brandService";
import Pagination from "../../../../shared/components/pagination/Pagination";
import {useNavigate} from "react-router-dom";
import toastr from "toastr";
import {Form, Formik} from "formik";
import BaseInput from "../../../../shared/components/form-elements/base-input/BaseInput";
import * as Yup from "yup";
import Modal from "../../../../shared/components/modal/Modal";
import {useOverlay} from "../../../../shared/contexts/OverlayContext";

//TODO: Edit popup
export default function BrandList() {
	const [pagination, setPagination] = useState({page: 0, pageSize: 10});
	const [brandData, setBrandData] = useState({});
	const [brandToDelete, setBrandToDelete] = useState({});
	const [showQuickAddForm, setShowQuickAddForm] = useState(false);
	const [editingBrand, setEditingBrand] = useState({});
	const navigate = useNavigate();
	const overlayContext = useOverlay();

	useEffect(() => {
		fetchBrands();
	}, [pagination]);

	useEffect(() => {
		if (brandToDelete.id) {
			overlayContext.setAndShow({
				title: "Silme İşlemi",
				body:
					brandToDelete.name +
					" isimli markayı silmek istediğinize emin misiniz?",
				onCloseClick: () => {
					overlayContext.setShow(false);
				},
				cancelBtnClick: () => {
					overlayContext.setShow(false);
				},
				submitBtnClick: () => {
					confirmDelete();
				},
			});
		}
	}, [brandToDelete]);

	const fetchBrands = () => {
		let brandService = new BrandService();
		brandService.getAll(pagination.page, pagination.pageSize).then(response => {
			setBrandData(response.data);
		});
	};
	const confirmDelete = () => {
		let brandService = new BrandService();
		brandService.delete(brandToDelete.id).then(response => {
			toastr.success("Marka başarıyla silindi.");
			setPagination({page: 0, pageSize: 10});
			overlayContext.setShow(false);
		});
	};

	const quickAddValidatonSchema = Yup.object({
		name: Yup.string().required(),
	});

	const quickEditValidationSchema = Yup.object({
		id: Yup.number().required().min(0),
		name: Yup.string().required(),
	});

	const addBrand = values => {
		let brandService = new BrandService();
		brandService
			.add(values)
			.then(response => {
				toastr.success("Marka başarıyla eklendi.");
				setPagination({page: 0, pageSize: 10});
			})
			.finally(() => {
				setShowQuickAddForm(false);
			});
	};

	const brandTableRowTemplate = brand => {
		return (
			<tr>
				<th scope="row">{brand.id}</th>
				<td>{brand.name}</td>
				<td>
					<button
						className="btn btn-warning mx-1"
						onClick={() => {
							navigate("/brand/update/" + brand.id);
						}}
					>
						Edit
					</button>
					<button
						className="btn btn-success mx-1"
						onClick={() => {
							setEditingBrand(brand);
						}}
					>
						Quick Edit
					</button>
					<button
						className="btn btn-danger"
						onClick={() => {
							setBrandToDelete(brand);
						}}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	};

	const update = brand => {
		let brandService = new BrandService();
		brandService.update(brand).then(response => {
			toastr.success("Marka başarıyla güncellendi");
			setEditingBrand({});
			setPagination({page: 0, pageSize: 10});
		});
	};

	// One way data binding
	// Two way data binding
	const brandEditTemplate = brand => {
		return (
			<tr>
				<th scope="row">
					<input
						className="form-control"
						name="id"
						value={editingBrand.id}
						disabled
					></input>
				</th>
				<td>
					<input
						className="form-control"
						name="name"
						value={editingBrand.name}
						onChange={event =>
							setEditingBrand({...editingBrand, name: event.target.value})
						}
					></input>
				</td>
				<td>
					<button
						className="btn btn-success mx-1"
						onClick={() => {
							// YUP'da manual validation
							quickEditValidationSchema
								.validate(editingBrand)
								.then(response => {
									// validation başarılı
									update(response);
								})
								.catch(error => {
									// validation hatalı
									toastr.error(error);
								});
						}}
					>
						Save
					</button>
					<button
						className="btn btn-danger"
						onClick={() => {
							setEditingBrand({});
						}}
					>
						Cancel
					</button>
				</td>
			</tr>
		);
	};

	const addBrandTemplate = () => {
		return (
			<Formik
				initialValues={{name: ""}}
				onSubmit={values => {
					addBrand(values);
					overlayContext.setShow(false);
				}}
				validationSchema={quickAddValidatonSchema}
			>
				<Form>
					<BaseInput name="name" type="text" label="Marka İsmi"></BaseInput>
					<button className="btn btn-primary mt-2 w-100" type="submit">
						Submit
					</button>
				</Form>
			</Formik>
		);
	};

	return (
		<React.Fragment>
			<div className="container mt-3">
				<h3>Brand List</h3>
				<button
					className="btn btn-primary"
					onClick={() => {
						overlayContext.setAndShow({
							title: "Ekleme İşlemi",
							body: addBrandTemplate(),
							onCloseClick: () => {
								overlayContext.setShow(false);
							},
							cancelBtnClick: () => {
								overlayContext.setShow(false);
							},
							footer: <></>,
							reRender: false,
						});
					}}
				>
					Yeni Ekle
				</button>
				<button
					className="btn mx-2 btn-secondary"
					onClick={() => {
						setShowQuickAddForm(true);
					}}
				>
					Hızlı Ekle
				</button>
				{showQuickAddForm && (
					<Formik
						initialValues={{name: ""}}
						onSubmit={values => {
							addBrand(values);
						}}
						validationSchema={quickAddValidatonSchema}
					>
						<Form>
							<BaseInput name="name" label="Marka Adı"></BaseInput>
							<div className="mt-2">
								<button className="btn btn-primary" type="submit">
									Ekle
								</button>
								<button
									className="btn btn-secondary mx-2"
									onClick={() => {
										setShowQuickAddForm(false);
									}}
								>
									İptal
								</button>
							</div>
						</Form>
					</Formik>
				)}
				<table class="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Brand Name</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{brandData.items?.map(brand =>
							editingBrand.id && editingBrand.id == brand.id
								? brandEditTemplate(brand)
								: brandTableRowTemplate(brand),
						)}
					</tbody>
				</table>
				<Pagination
					hasPrevious={brandData.hasPrevious}
					hasNext={brandData.hasNext}
					pages={brandData.pages}
					index={brandData.index}
					onPageChange={i => {
						setPagination({page: i, pageSize: pagination.pageSize});
					}}
					onPageSizeChange={i => {
						setPagination({page: pagination.page, pageSize: i});
					}}
				></Pagination>
			</div>
		</React.Fragment>
	);
}
// && => JSX'de sol taraftaki ifade TRUE ise sağ taraftaki JSX'i render et
// React LifeCycle

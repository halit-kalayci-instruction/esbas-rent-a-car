import React, {useEffect, useState} from "react";
import BrandService from "../../../brand/services/brandService";
import Pagination from "../../../../shared/components/pagination/Pagination";
import {useNavigate} from "react-router-dom";
import toastr from "toastr";
export default function BrandList() {
	const [pagination, setPagination] = useState({page: 0, pageSize: 10});
	const [brandData, setBrandData] = useState({});
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [brandToDelete, setBrandToDelete] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		fetchBrands();
	}, [pagination]);

	const fetchBrands = () => {
		let brandService = new BrandService();
		brandService.getAll(pagination.page, pagination.pageSize).then(response => {
			setBrandData(response.data);
		});
	};
	//!Brandler çekilecek
	//!Tabloda maplenerek gösterilecek
	//!Pagination eklenecek
	//!Edit butonu tıklanan rowun idsi ile /brand/update/id navigate edilecek
	//!Delete olduğunda modal ile emin misin? modalı çıkartılacak
	//!cevaba göre delete işlemi gerçekleştirelecek.
	// QUICK EDIT / QUICK ADD
	const confirmDelete = () => {
		let brandService = new BrandService();
		brandService.delete(brandToDelete.id).then(response => {
			// silindiğinde yapılacak işlemler.
			//? Direkt API'den verilerin son halini çek.
			toastr.success("Marka başarıyla silindi.");
			setPagination({page: 0, pageSize: 10});
			setShowDeleteModal(false);
			//? Silindiğine eminim, hafızadaki verileri buna göre uyarla.
			// brandData = {page:0, size:15, items:[1,2,3]}
			// brandData = {items:[1,2]}
			// setBrandData({
			// 	...brandData,
			// 	items: brandData.items.filter(i => i.id != brandToDelete.id),
			// });
		});
	};
	return (
		<React.Fragment>
			<div className="container mt-3">
				<h3>Brand List</h3>
				<button
					className="btn btn-primary"
					onClick={() => {
						navigate("/brand/add");
					}}
				>
					{" "}
					Yeni Ekle{" "}
				</button>
				<table class="table table-striped">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Brand Name</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{brandData.items?.map(brand => (
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
										className="btn btn-danger"
										onClick={() => {
											setBrandToDelete(brand);
											setShowDeleteModal(true);
										}}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
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
			{showDeleteModal && (
				<div class="modal fade show d-block" tabindex="-1">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title">Silme İşlemi</h5>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
									onClick={() => {
										setShowDeleteModal(false);
									}}
								></button>
							</div>
							<div class="modal-body">
								<p>
									{brandToDelete.name} isimli markayı silmek istediğinize emin
									misiniz?
								</p>
							</div>
							<div class="modal-footer">
								<button
									type="button"
									class="btn btn-secondary"
									data-bs-dismiss="modal"
									onClick={() => {
										setShowDeleteModal(false);
									}}
								>
									Close
								</button>
								<button
									onClick={() => {
										confirmDelete();
									}}
									type="button"
									class="btn btn-danger"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</React.Fragment>
	);
}
// && => JSX'de sol taraftaki ifade TRUE ise sağ taraftaki JSX'i render et

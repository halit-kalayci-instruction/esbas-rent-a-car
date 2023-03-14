import React, {useEffect, useState} from "react";
import BrandService from "../../../brand/services/brandService";
import Pagination from "../../../../shared/components/pagination/Pagination";

export default function BrandList() {
	const [pagination, setPagination] = useState({page: 0, pageSize: 1});
	const [brandData, setBrandData] = useState({});

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
	// Pagination eklenecek
	// Edit butonu tıklanan rowun idsi ile /brand/update/id navigate edilecek
	// Delete olduğunda modal ile emin misin? cevaba göre delete işlemi gerçekleştirelecek.
	return (
		<div className="container mt-3">
			<h3>Brand List</h3>
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
								<button className="btn btn-warning mx-1">Edit</button>
								<button className="btn btn-danger">Delete</button>
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
	);
}

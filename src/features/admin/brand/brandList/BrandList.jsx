import React, {useEffect, useState} from "react";
import BrandService from "../../../brand/services/brandService";

export default function BrandList() {
	const [pagination, setPagination] = useState({page: 0, pageSize: 10});
	const [brandData, setBrandData] = useState({});
	useEffect(() => {
		fetchBrands();
	}, []);

	const fetchBrands = () => {
		let brandService = new BrandService();
		brandService.getAll(pagination.page, pagination.pageSize).then(response => {
			setBrandData(response.data);
		});
	};
	// Brandler çekilecek
	// Pagination eklenecek
	// Tabloda maplenerek gösterilecek
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
					{brandData.items.map(brand => (
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
		</div>
	);
}

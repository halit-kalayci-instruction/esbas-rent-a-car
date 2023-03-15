import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

// Sayfa açıldığında update mi add mi karar ver (params)
// Update ise git brand bilgilerini API'den getir
// Form içerisiini otomatik doldur
// submit..
export default function AddBrand() {
	const params = useParams();
	const [isUpdating, setIsUpdating] = useState(false);
	useEffect(() => {
		// if (params.id) {
		// }
		let result = params.id != undefined;
		setIsUpdating(result);
		if (result) {
			// getByID isteği
		}
		// eğer parametrede id varsa update yoksa add
	}, []);

	const updateTemplate = () => {
		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<h3>Update</h3>
					</div>
				</div>
			</div>
		);
	};

	const addTemplate = text => {
		return (
			<div className="container">
				<div className="row">
					<div className="col-4">
						<h3>{text}</h3>
					</div>
				</div>
			</div>
		);
	};

	return <div>{isUpdating ? updateTemplate() : addTemplate("Merhaba")}</div>;
}

import React from "react";
import {useTranslation} from "react-i18next";

export default function Pagination(props) {
	const {t} = useTranslation();
	const {pageSizes = [1, 10, 50]} = props;
	return (
		<div className="row">
			<div className="col-3">
				<nav aria-label="Page navigation example">
					<ul className="pagination">
						{props.hasPrevious && (
							<li className="page-item">
								<a
									onClick={() => {
										props.onPageChange(props.index - 1);
									}}
									className="page-link"
								>
									{t("previous")}
								</a>
							</li>
						)}
						{[...Array(props.pages)].map((page, index) => (
							<li
								key={index}
								className={
									"page-item " + (props.index == index ? "active" : "")
								}
							>
								<a
									onClick={() => {
										props.onPageChange(index);
									}}
									className="page-link"
								>
									{index + 1}
								</a>
							</li>
						))}
						{props.hasNext && (
							<li className="page-item">
								<a
									onClick={() => {
										props.onPageChange(props.index + 1);
									}}
									className="page-link"
								>
									{t("next")}
								</a>
							</li>
						)}
					</ul>
				</nav>
			</div>
			<div className="col-2">
				<select
					onChange={event => {
						props.onPageSizeChange(event.target.value);
					}}
					className="form-select"
				>
					{pageSizes.map(pageSize => (
						<option value={pageSize}> {pageSize}</option>
					))}
				</select>
			</div>
		</div>
	);
}

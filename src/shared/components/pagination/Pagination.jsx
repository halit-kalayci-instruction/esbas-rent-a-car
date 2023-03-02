import React from "react";

export default function Pagination(props) {
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
									Previous
								</a>
							</li>
						)}
						{[...Array(props.pages)].map((page, index) => (
							<li
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
									Next
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
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
			</div>
		</div>
	);
}

import React from "react";

function Modal(props) {
	return (
		<div class="modal fade show d-block" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">{props.title}</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={() => {
								props.onCloseClick();
							}}
						></button>
					</div>
					<div class="modal-body">
						<p>{props.body}</p>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal"
							onClick={() => {
								props.cancelBtnClick();
							}}
						>
							{props.cancelBtnText ?? "Cancel"}
						</button>
						<button
							onClick={() => {
								props.submitBtnClick();
							}}
							type="button"
							class="btn btn-danger"
						>
							{props.submitBtnText ?? "Submit"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;

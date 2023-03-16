import React from "react";

function Modal({
	title,
	body,
	footer,
	cancelBtnClick,
	cancelBtnText,
	submitBtnClick,
	submitBtnText,
	onCloseClick,
	show = true,
}) {
	return (
		<div
			className={"modal " + (show ? " fade show d-block" : "")}
			tabindex="-1"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">{title}</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={() => {
								onCloseClick();
							}}
						></button>
					</div>
					<div class="modal-body">
						<p>{body}</p>
					</div>
					<div class="modal-footer">
						{footer ? (
							footer
						) : (
							<React.Fragment>
								<button
									type="button"
									class="btn btn-secondary"
									data-bs-dismiss="modal"
									onClick={() => {
										cancelBtnClick();
									}}
								>
									{cancelBtnText ?? "Cancel"}
								</button>
								<button
									onClick={() => {
										submitBtnClick();
									}}
									type="button"
									class="btn btn-danger"
								>
									{submitBtnText ?? "Submit"}
								</button>
							</React.Fragment>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
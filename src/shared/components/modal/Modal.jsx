import React, {useEffect} from "react";
import {useOverlay} from "../../contexts/OverlayContext";

function Modal() {
	// useRef
	// primeReact toastr
	// context ile bağlantı

	//TODO: ReRender false durumunu handle et.
	const overlayContext = useOverlay();
	useEffect(() => {
		console.log(overlayContext);
	}, [overlayContext]);

	const getReRenderStatus = () => {
		if (!overlayContext.reRender) return overlayContext.show;
		return overlayContext.reRender && overlayContext.show;
	};
	return (
		getReRenderStatus() && (
			<div
				className={"modal " + (overlayContext.show ? " fade show d-block" : "")}
				tabindex="-1"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">
								{overlayContext.modalInformation.title}
							</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => {
									overlayContext.modalInformation.onCloseClick();
									overlayContext.setShow(false);
								}}
							></button>
						</div>
						<div class="modal-body">
							<p>{overlayContext.modalInformation.body}</p>
						</div>
						<div class="modal-footer">
							{overlayContext.modalInformation.footer ? (
								overlayContext.modalInformation.footer
							) : (
								<React.Fragment>
									<button
										type="button"
										class="btn btn-secondary"
										data-bs-dismiss="modal"
										onClick={() => {
											overlayContext.modalInformation.cancelBtnClick();
											overlayContext.setShow(false);
										}}
									>
										{overlayContext.modalInformation.cancelBtnText ?? "Cancel"}
									</button>
									<button
										onClick={() => {
											overlayContext.modalInformation.submitBtnClick();
										}}
										type="button"
										class="btn btn-danger"
									>
										{overlayContext.modalInformation.submitBtnText ?? "Submit"}
									</button>
								</React.Fragment>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	);
}

export default Modal;

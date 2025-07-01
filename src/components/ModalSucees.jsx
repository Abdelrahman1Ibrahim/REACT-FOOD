import { use, forwardRef } from "react";
import { createPortal } from "react-dom";

import { CartContext } from "../utilits/context/CartContext";

import useLinkModal from "../hooks/useLinkModal";

const ModalSucess = forwardRef(function ModalSucess(
  { openModal, resetModal },
  ref
) {
  console.log("Modal Sucess rendered");

  const { modalRef: modalFormsucessRef } = useLinkModal(ref);

  const { resetItems } = use(CartContext);

  return createPortal(
    <dialog
      ref={modalFormsucessRef}
      open={openModal}
      onClose={resetModal}
      className="modal"
    >
      <h2>Order Recieved</h2>
      <p>your order has been successfully submitted</p>
      <p>We will get back to you soon</p>
      <div className="modal-actions">
        <button className="button" onClick={resetModal}>
          Close
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});
export default ModalSucess;

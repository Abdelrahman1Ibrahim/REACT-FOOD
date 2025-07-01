import { forwardRef, use } from "react";
import { createPortal } from "react-dom";

import useLinkModal from "../hooks/useLinkModal";
import useFunctionModal from "../hooks/useFunctionModal";

import { CartContext } from "../utilits/context/CartContext";

import ModalForm from "./ModalFrom";

const ModalCart = forwardRef(function Modal({ open, resetModal }, ref) {
  console.log("Modal Cart rendered");

  const { items, incrementCount, decrementCount, getTotalPrice } =
    use(CartContext);

  const { modalRef } = useLinkModal(ref);

  const {
    handleOpenModal: handelOpenForm,
    openModal: openForm,
    modalRef: modalForm,
    handelResetModal
  } = useFunctionModal();

  function handelCheckout() {
    handelOpenForm();
    resetModal();
  }
  function handelDecrement(id) {
    const updatedLength = decrementCount(id);
    if (updatedLength === 0) resetModal();
  }

  return createPortal(
    <>
      <dialog ref={modalRef} open={open} onClose={resetModal} className="modal">
        <h2>Your Cart</h2>
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <p>
                {item.name} - {item.count} x ${item.price}
              </p>
              <div className="cart-item-actions">
                <button onClick={() => handelDecrement(item.id)}>-</button>
                <span>{item.count}</span>
                <button onClick={() => incrementCount(item.id)}>+</button>
              </div>
            </li>
          ))}
        </ul>

        <div className="cart-total">${getTotalPrice()}</div>

        <div className="modal-actions">
          <button className="text-button" onClick={resetModal}>
            Close
          </button>
          <button className="button" onClick={handelCheckout}>
            Go to Checkout
          </button>
        </div>
      </dialog>
      <ModalForm
        ref={modalForm}
        open={openForm}
        resetModal={handelResetModal}
      />
    </>,
    document.getElementById("modal")
  );
});

export default ModalCart;

import { forwardRef, use, useActionState, useState, memo } from "react";
import { createPortal } from "react-dom";

import useLinkModal from "../hooks/useLinkModal";
import useFunctionModal from "../hooks/useFunctionModal.js";
import { CartContext } from "../utilits/context/CartContext";
import submitOrder from "../http.js";

import Input from "./Input";
import Error from "./Error";
import ModalSucess from "./Modalsucees.jsx";

const ModalForm = forwardRef(function Modal({ open, resetModal }, ref) {
  console.log("Modal Form rendered");

  const { items, getTotalPrice, resetItems } = use(CartContext);
  const [sumbittingError, setSubmittingError] = useState(null);
  const { modalRef: formModal } = useLinkModal(ref);

  const {
    handleOpenModal: handelOpenSucess,
    openModal: openModalSucess,
    modalRef: modalSucess,
    handelResetModal
  } = useFunctionModal();

  async function checkoutAction(prevState, formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const street = formData.get("street");
    const postalCode = formData.get("postalCode");
    const city = formData.get("city");

    console.log(fullName, email, street, postalCode, city);
    const error = [];
    if (fullName.trim().length <= 10) {
      error.push("Full name must be at least 10 characters long.");
    }
    if (!email.trim().includes("@")) {
      error.push("Please enter a valid email address.");
    }
    if (street.trim().length <= 5) {
      error.push("Street must be at least 5 characters long.");
    }
    if (postalCode.trim().length !== 5) {
      error.push("Postal code must be 5 characters long.");
    }
    if (city.trim().length <= 3) {
      error.push("City must be at least 3 characters long.");
    }

    if (error.length > 0) {
      return {
        errors: error,
        data: {
          fullName,
          email,
          street,
          postalCode,
          city
        }
      };
    }

    const order = {
      items,
      customer: {
        name: fullName,
        email,
        street,
        "postal-code": postalCode,
        city
      }
    };

    try {
      await submitOrder("http://localhost:3000/orders", order);
      handelOpenSucess();
      resetModal();
      resetItems();
    } catch (error) {
      setSubmittingError(error.message);
    }
    return {
      errors: null,
      data: {
        fullName: "",
        email: "",
        street: "",
        postalCode: "",
        city: ""
      }
    };
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, {
    errors: null
  });

  return createPortal(
    <>
      <dialog ref={formModal} open={open} className="modal">
        <h2>Checkout</h2>
        <p>Total Amount ${getTotalPrice()}</p>
        <form action={formAction}>
          <Input
            id="fullName"
            label="Full Name"
            type="text"
            defaultValue={formState.data?.fullName}
          />
          <Input
            id="email"
            label="E-Mail Address"
            type="email"
            defaultValue={formState.data?.email}
          />
          <Input
            id="street"
            label="Street"
            type="text"
            defaultValue={formState.data?.street}
          />
          <div className="control-row">
            <Input
              id="postalCode"
              label="Postal Code"
              type="text"
              defaultValue={formState.data?.postalCode}
            />
            <Input
              id="city"
              label="City"
              type="text"
              defaultValue={formState.data?.city}
            />
          </div>

          <div className="modal-actions">
            <button type="reset" className="text-button" onClick={resetModal}>
              Close
            </button>
            <button className="button" disabled={pending}>
              {pending ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </form>
        <div>
          {formState.errors && (
            <ul>
              {formState.errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </ul>
          )}
        </div>
        {sumbittingError && <Error error={sumbittingError} />}
      </dialog>
      <ModalSucess
        ref={modalSucess}
        openModal={openModalSucess}
        resetModal={handelResetModal}
      />
    </>,
    document.getElementById("modal")
  );
});

export default memo(ModalForm);

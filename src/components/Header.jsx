import { use } from "react";
import { CartContext } from "../utilits/context/CartContext.jsx";
import ModalCart from "./ModalCart.jsx";

import useFunctionModal from "../hooks/useFunctionModal.js";
import logo from "../../public/logo.jpg";

export default function Header() {
  console.log("Header rendered");

  const { items } = use(CartContext);

  const {
    modalRef: modalCart,
    openModal: openCart,
    handelResetModal,
    handleOpenModal: openModalCart
  } = useFunctionModal();

  const NumberOfItems = items.length;

  function handelOpen() {
    if (NumberOfItems === 0) return;
    openModalCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="logo" />
          <h1>REACT FOOD</h1>
        </div>

        <button className="button" onClick={handelOpen}>
          Cart ({NumberOfItems})
        </button>
      </header>

      <ModalCart
        ref={modalCart}
        open={openCart}
        resetModal={handelResetModal}
      />
    </>
  );
}

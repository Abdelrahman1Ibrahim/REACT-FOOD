import { useRef, useState, useCallback } from "react";
export default function useFunctionModal() {
  const modalRef = useRef();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(function handleOpenModal() {
    modalRef.current?.openModal();
    setOpenModal(true);
  }, []);

  const handelResetModal = useCallback(function handelResetModal() {
    modalRef.current?.closeModal();
    setOpenModal(false);
  }, []);

  return { handleOpenModal, handelResetModal, modalRef, openModal };
}

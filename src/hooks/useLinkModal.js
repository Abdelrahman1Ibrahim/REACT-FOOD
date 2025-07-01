import { useImperativeHandle, useRef } from "react";

export default function useModal(ref) {
  const modalRef = useRef();
  useImperativeHandle(ref, () => ({
    openModal() {
      modalRef.current?.showModal();
    },
    closeModal() {
      modalRef.current?.close();
    }
  }));

  return { modalRef };
}

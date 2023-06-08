import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
const Modal = ({ children, onClose }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <AiOutlineClose className='close-modal' onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;

import './Modal.css';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
const Modal = ({ children, onClose }) => {
  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <AiOutlineClose className='close-modal-icon' onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;

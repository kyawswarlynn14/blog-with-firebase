import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-4 rounded shadow-lg w-1/2">
        {children}
      </div>
    </div>
  );
};

export default Modal;

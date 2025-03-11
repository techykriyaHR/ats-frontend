import React from "react";

const WarningModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-opacity-50 absolute inset-0"></div>
      <div className="z-10 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Warning</h2>
        <p className="mb-4">{message}</p>
        <button
          className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarningModal;

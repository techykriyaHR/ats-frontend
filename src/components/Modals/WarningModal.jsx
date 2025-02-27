import React from 'react';

const WarningModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-xl font-semibold mb-4">Warning</h2>
        <p className="mb-4">{message}</p>
        <button
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
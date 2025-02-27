import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirm Navigation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded-md bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-[#008080] text-white hover:bg-teal-700"
            onClick={onConfirm}
          >
            Leave Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
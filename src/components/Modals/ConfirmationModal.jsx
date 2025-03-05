import React from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Confirm Navigation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="rounded-md bg-teal-600/10 px-4 py-2 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-[#008080] px-4 py-2 text-white hover:bg-teal-700"
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

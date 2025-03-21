import React from "react";

const ConfirmationModal = ({ title, message, confirmText, cancelText, onConfirm, onCancel }) => {
  return (
    <div className="bg-black/50 fixed inset-0 flex items-center justify-center z-50">
      <div className="w-full h-full flex items-center justify-center">
        <div className="rounded-lg bg-white p-6 shadow-lg max-w-md w-full">
          <h2 className="mb-4 text-lg font-semibold">{title}</h2>
          <p className="mb-4">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              className="rounded-md bg-teal-600/10 px-4 py-2 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              className="rounded-md bg-[#008080] px-4 py-2 text-white hover:bg-teal-700"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
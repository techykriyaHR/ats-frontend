import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ onClose, children }) {
  return (
    <div className="bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md bg-white p-6 shadow-lg">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 p-4 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full overflow-y-auto max-h-[90vh] relative">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <AiOutlineClose size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
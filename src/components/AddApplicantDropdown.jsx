import { useState, useRef, useEffect } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import Upload from "../layouts/Upload";

export default function AddApplicantDropdown({ onAddManually }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const dropdownRef = useRef(null);
    const uploadRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleUploadClick = () => {
        setIsOpen(false);
        setIsUploadOpen(true);
        setTimeout(() => {
            uploadRef.current.triggerFileInput();
        }, 0);
    };

    const handleUploadClose = () => {
        setIsUploadOpen(false);
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden sm:flex items-center px-2 py-1 bg-teal border border-teal text-white rounded-md text-sm hover:bg-teal-light focus:outline-none cursor-pointer"
            >
                <FiPlus className="mr-2 h-4 w-4" /> Add Applicant
            </button>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex sm:hidden items-center px-2 py-1 bg-teal border border-teal text-white rounded-md text-sm hover:bg-teal-light focus:outline-none cursor-pointer"
            >
                <FiPlus className="mr-2 h-4 w-4" /> Add
            </button>

            {isOpen && (
                <div className="absolute w-20 sm:w-full mt-1 bg-white border border-gray-200 rounded-lg z-10">
                    <button
                        className="block text-center text-sm px-2 py-2 text-gray-dark hover:bg-gray-100"
                        onClick={() => onAddManually()}
                    >
                        Add Manually
                    </button>
                    <button
                        className="block text-center text-sm px-2 py-2 text-gray-dark hover:bg-gray-100"
                        onClick={handleUploadClick}
                    >
                        Upload File
                    </button>
                </div>
            )}

            {isUploadOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <Upload ref={uploadRef} onClose={handleUploadClose} />
                    </div>
                </div>
            )}
        </div>
    );
}
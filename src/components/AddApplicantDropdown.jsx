import { useState, useRef, useEffect } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";

export default function AddApplicantDropdown({ onAddManually, onUploadFile }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-4 py-2 bg-teal text-white rounded-lg shadow-md text-sm hover:bg-teal-light focus:outline-none cursor-pointer"
            >
                <FiPlus className="mr-2 h-4 w-4" /> Add Applicant
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => onAddManually()}
                    >
                        Add Manually
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => alert("Upload File Clicked")}
                    >
                        Upload File
                    </button>
                </div>
            )}
        </div>
    );
}

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
                className="hidden sm:flex items-center px-2 py-1 bg-teal border border-teal  text-white rounded-md text-sm hover:bg-teal-light focus:outline-none cursor-pointer"
            >
                <FiPlus className="mr-2 h-4 w-4" /> Add Applicant
            </button>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex sm:hidden items-center px-2 py-1 bg-teal border border-teal  text-white rounded-md text-sm hover:bg-teal-light focus:outline-none cursor-pointer"
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
                        onClick={() => alert("Upload File Clicked")}
                    >
                        Upload File
                    </button>
                </div>
            )}
        </div>
    );
}

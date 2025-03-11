import { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FiUpload } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import ReviewApplicants from "./Applicant/ReviewApplicants";

function Upload() {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [flaggedApplicants, setFlaggedApplicants] = useState([]);
  const [reviewing, setReviewing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!reviewing) {
      setIsUploading(false);
    }
  }, [reviewing]);

  const resetStates = () => {
    setIsUploading(false);
    setMessage(null);
    setApplicants([]);
    setFlaggedApplicants([]);
    setReviewing(false);
    setCurrentIndex(0);
  };

  const excelDateToJSDate = (serial) => {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial) + 0.0000001;

    let total_seconds = Math.floor(86400 * fractional_day);

    const seconds = total_seconds % 60;

    total_seconds -= seconds;

    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  };

  const mapExcelDataToApplicant = (excelRow) => {
    return {
      first_name: excelRow.first_name || excelRow.firstName || "",
      middle_name: excelRow.middle_name || excelRow.middleName || "",
      last_name: excelRow.last_name || excelRow.lastName || "",
      gender: excelRow.gender || "",
      birth_date: typeof excelRow.birth_date === 'number' ? excelDateToJSDate(excelRow.birth_date).toISOString().split('T')[0] : excelRow.birth_date || excelRow.birthDate || null,
      discovered_at: excelRow.discovered_at || "Unknown",
      email: excelRow.email || excelRow.email_1 || "",
      email_1: excelRow.email || excelRow.email_1 || "",
      email_2: excelRow.email_2 || "",
      email_3: excelRow.email_3 || "",
      contactNo: excelRow.contact_no || excelRow.contactNo || excelRow.mobile_number_1 || "",
      mobile_number_1: excelRow.contact_no || excelRow.contactNo || excelRow.mobile_number_1 || "",
      mobile_number_2: excelRow.mobile_number_2 || "",
      position_id: excelRow.position_id || "default-position-id",
      applied_source: excelRow.applied_source || "Excel Upload",
      created_by: excelRow.created_by || "system",
      updated_by: excelRow.updated_by || "system",
      cv_link: excelRow.cv_link || null
    };
  };

  const forwardToBackend = async (applicants) => {
    setIsUploading(true);
    setMessage({ type: "info", text: "Uploading applicants..." });

    try {
      const formattedApplicants = JSON.stringify(applicants);
      const formData = new FormData();
      formData.append("applicants", formattedApplicants);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}/applicants/add/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Backend response:", response.data);

      if (response.data.flagged && response.data.flagged.length > 0) {
        setFlaggedApplicants(response.data.flagged);
        setReviewing(true);
      } else {
        setMessage({ type: "success", text: response.data.message });
      }
    } catch (error) {
      console.error("Upload error:", error);
      console.error("Error details:", error.response?.data);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error uploading applicants"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length === 0) {
        setMessage({ type: "error", text: "No data found in the Excel file" });
        return;
      }

      const mappedApplicants = jsonData.map(mapExcelDataToApplicant);
      setApplicants(mappedApplicants);
      await forwardToBackend(mappedApplicants);
    } catch (error) {
      console.error("File processing error:", error);
      setMessage({ type: "error", text: "Error processing Excel file" });
    }
  };

  const handleAccept = async (index) => {
    try {
      setIsUploading(true);
      const acceptedApplicant = flaggedApplicants[index].applicant;

      // Create payload similar to AddApplicantForm.jsx
      const payload = {
        applicant: JSON.stringify({
          first_name: acceptedApplicant.first_name,
          middle_name: acceptedApplicant.middle_name,
          last_name: acceptedApplicant.last_name,
          birth_date: acceptedApplicant.birth_date,
          gender: acceptedApplicant.gender,
          email_1: acceptedApplicant.email_1,
          mobile_number_1: acceptedApplicant.mobile_number_1,
          cv_link: acceptedApplicant.cv_link,
          discovered_at: acceptedApplicant.discovered_at,
          referrer_id: acceptedApplicant.referrer_id,
          created_by: acceptedApplicant.created_by,
          updated_by: acceptedApplicant.updated_by,
          company_id: acceptedApplicant.company_id,
          position_id: acceptedApplicant.position_id,
          test_result: acceptedApplicant.test_result,
          date_applied: acceptedApplicant.date_applied,
        }),
      };

      console.log("Accepted applicant payload:", payload);

      // Use the applicant/add endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}/applicants/add`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setMessage({ type: "success", text: "Applicant accepted and saved successfully" });
        // Remove the accepted applicant from the flagged list
        setFlaggedApplicants(flaggedApplicants.filter((_, i) => i !== index));

        // Adjust current index if needed
        if (index >= flaggedApplicants.length - 1) {
          setCurrentIndex(0);
        }
      }
    } catch (error) {
      console.error("Error accepting applicant:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Error saving accepted applicant",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleReject = (index) => {
    setFlaggedApplicants(flaggedApplicants.filter((_, i) => i !== index));
    if (index >= flaggedApplicants.length - 1) {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < flaggedApplicants.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="relative">
      {!reviewing ? (
        <>
          <label className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer">
            <FiUpload className="w-4 h-4 mr-2" />
            <span>{isUploading ? "Uploading..." : "Upload Applicants"}</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFile}
              className="hidden"
              disabled={isUploading}
            />
          </label>

          {message && (
            <div className={`mt-2 p-2 text-sm rounded-md ${message.type === "success" ? "bg-green-100 text-green-800" :
                message.type === "error" ? "bg-red-100 text-red-800" :
                  message.type === "warning" ? "bg-yellow-100 text-yellow-800" :
                    "bg-blue-100 text-blue-800"
              }`}>
              {message.text}
            </div>
          )}
        </>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 p-4 z-50">

          <div className="absolute top-4 right-4">
            <button onClick={resetStates} className="text-gray-600 hover:text-gray-900">
              <AiOutlineClose size={24} />
            </button>
          </div>
          <ReviewApplicants
            applicants={flaggedApplicants}
            currentIndex={currentIndex}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onAccept={handleAccept}
            onReject={handleReject}
            onClose={resetStates}
          />
        </div>

      )}
    </div>
  );
}

export default Upload;
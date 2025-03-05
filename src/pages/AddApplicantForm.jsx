import React, { useState } from "react";
import { FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import axios from "axios";

const formSchema = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthdate: "",
  gender: "",
  email: "",
  phone: "",
  cvLink: "",
  position: "",
  source: "",
  referrer: "",
  testResult: "",
  dateApplied: "",
};

const duplicates = [
  {
    name: "Juniper Wright Williams",
    dateApplied: "October 24, 2024",
    positionApplied: "Business Operations Associate",
    applicationStatus: "Business Operations Associate",
    emailAddress: "junkyblue@gmail.com",
    similarities: ["First Name", "Last Name", "Email Address"],
  },
  {
    name: "Saturnino Paterno",
    dateApplied: "October 24, 2023",
    positionApplied: "Software Engineer",
    applicationStatus: "Business Operations Associate",
    emailAddress: "satkyblue@gmail.com",
    similarities: ["Email Address"],
  },
];

function AddApplicantForm({ onClose }) {
  const [formData, setFormData] = useState(formSchema);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      applicant: JSON.stringify({
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        birth_date: formData.birthdate,
        gender: formData.gender,
        email_1: formData.email,
        mobile_number_1: formData.phone,
        cv_link: formData.cvLink,
        discovered_at: formData.source,
        referrer_id: formData.referrer,
        created_by: "user_id", // Replace with the actual logged-in user ID
        updated_by: "user_id",
        company_id: "company_id", // Set dynamically if needed
        position_id: formData.position,
        test_result: formData.testResult,
        date_applied: formData.dateApplied,
      }),
    };

    console.log("PAYLOAD:", payload);

    try {
      const response = await axios.post(
        "http://localhost:3000/applicants/add",
        payload,
      );
      console.log("Applicant added:", response.data);
      onClose();
    } catch (error) {
      console.error("Error adding applicant:", error);
    }
  };

  const handleCancel = () => {
    setShowConfirmationModal(true);
  };

  const confirmCancel = () => {
    setShowConfirmationModal(false);
    onClose();
  };

  const closeModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold">Add New Applicant</h1>
        </div>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-medium">Applicant Name</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="middleName"
                      placeholder="Middle Name"
                      value={formData.middleName}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col">
                  <label>Birthdate</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                    <FaCalendarAlt className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label>Gender</label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                      />
                      <span>Female</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === "other"}
                        onChange={handleChange}
                      />
                      <span>Other</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label>Date Applied</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateApplied"
                      value={formData.dateApplied}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                    <FaCalendarAlt className="absolute top-2 right-2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Contact Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(XXX) XXX-XXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>CV Link</label>
                <input
                  type="url"
                  name="cvLink"
                  placeholder="cv.link@drive.com"
                  value={formData.cvLink}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div>
                <label>Position Applied</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">Select Option</option>
                  <option value="engineer">Software Engineer</option>
                  <option value="designer">UI Designer</option>
                  <option value="manager">Product Manager</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label>Source</label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 p-2"
                  >
                    <option value="">Select Option</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Career Fair (Startup Caravan, University Visit)">
                      Career Fair (Startup Caravan, University Visit)
                    </option>
                  </select>
                </div>

                {formData.source === "Referral" && (
                  <div>
                    <label>Referrer</label>
                    <select
                      name="referrer"
                      value={formData.referrer}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    >
                      <option value="">Select Option</option>
                      <option value="john">John Doe</option>
                      <option value="jane">Jane Smith</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label>Test Result</label>
                <input
                  type="url"
                  name="testResult"
                  placeholder="https://testresults.com"
                  value={formData.testResult}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="rounded-md bg-teal-600/10 px-4 py-2 text-teal-600 hover:bg-teal-600/20 hover:text-teal-700"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#008080] px-4 py-2 text-white hover:bg-teal-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>

          <div className="w-full p-6 lg:w-96">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Possible Duplicates ({duplicates.length})
              </h2>
            </div>
            <div className="space-y-4">
              {duplicates.map((duplicate, index) => (
                <div key={index} className="space-y-2 border p-4">
                  <h3 className="font-medium">{duplicate.name}</h3>
                  <div className="text-muted-foreground space-y-1 text-sm">
                    <p>Date Applied: {duplicate.dateApplied}</p>
                    <p>Position Applied: {duplicate.positionApplied}</p>
                    <p>Application Status: {duplicate.applicationStatus}</p>
                    <p>Email Address: {duplicate.emailAddress}</p>
                  </div>
                  <div className="space-y-1 pt-2">
                    {duplicate.similarities.map((similarity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-yellow-600"
                      >
                        <FaExclamationTriangle className="h-4 w-4" />
                        <span>Similarity in {similarity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showConfirmationModal && (
          <ConfirmationModal
            message="Are you sure you want to leave this page? Unsaved changes will be lost."
            onConfirm={confirmCancel}
            onCancel={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default AddApplicantForm;

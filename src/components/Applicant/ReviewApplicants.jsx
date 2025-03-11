import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

function ReviewApplicants({ applicants, currentIndex, onNext, onPrevious, onAccept, onReject, onClose }) {
  if (!applicants || applicants.length === 0) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6">No Applicants to Review</h2>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const { applicant, possibleDuplicates } = applicants[currentIndex];

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Review Applicant ({currentIndex + 1} of {applicants.length})</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">
              {applicant.first_name} {applicant.last_name}
            </h3>

            <div className="space-y-3">
              <div>
                <p className="font-medium text-gray-700">Birth Date:</p>
                <p>{applicant.birth_date}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Date Applied:</p>
                <p>{applicant.discovered_at}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Position Applied:</p>
                <p>{applicant.position_name || "Software Engineer"}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Application Status:</p>
                <p>{applicant.status || "Business Operations Associate"}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Email Address:</p>
                <p>{applicant.email}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Phone Number:</p>
                <p>{applicant.contactNo || applicant.email}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 rounded-md border border-teal-600 text-teal-600 hover:bg-teal-50 font-medium min-w-[120px]"
                onClick={() => onReject(currentIndex)}
              >
                Reject
              </button>
              <button
                type="button"
                className="px-6 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 font-medium min-w-[120px]"
                onClick={() => onAccept(currentIndex)}
              >
                Accept
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Possible Duplicates</h3>
            {possibleDuplicates.length > 0 ? (
              possibleDuplicates.map((duplicate, index) => (
                <div key={index} className="border p-2 rounded-md mb-2">
                  <h4 className="font-bold">Possible Duplicate {index + 1}</h4>
                  <p><strong>Name:</strong> {duplicate.applicantFromDb.first_name} {duplicate.applicantFromDb.last_name}</p>
                  <p><strong>Email:</strong> {duplicate.applicantFromDb.email_1}</p>
                  <p><strong>Phone:</strong> {duplicate.applicantFromDb.mobile_number_1}</p>
                  <p className="flex items-center text-amber-500">
                    <FaExclamationTriangle className="mr-2" />
                    <strong>Similarities:</strong> {duplicate.similarity.join(", ")}
                  </p>
                </div>
              ))
            ) : (
              <p>No possible duplicates found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewApplicants;
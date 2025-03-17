"use client"

import { useState, useEffect } from "react";
import { FaUserTie, FaCode, FaDatabase, FaChartBar, FaServer, FaCamera } from "react-icons/fa";
import api from "../../api/axios.js"; // Import the axios instance

export default function ATSHealthcheck({ onSelectApplicant }) {
  const [activeTab, setActiveTab] = useState("general");
  const [notifications, setNotifications] = useState({
    general: [],
    needsAttention: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await api.get("/notification");
        const data = response.data;

        if (!data) {
          throw new Error("No data received from server");
        }

        // Format ATS notifications
        const generalNotifications = [];
        const needsAttentionNotifications = [];

        // Get current date for comparison
        const now = new Date();
        const threeDaysAgo = new Date(now);
        threeDaysAgo.setDate(now.getDate() - 3);

        // Process ATS applicants
        if (data.ats && Array.isArray(data.ats)) {
          data.ats.forEach(applicant => {
            const notificationItem = {
              id: applicant.applicant_id,
              name: `${applicant.first_name} ${applicant.last_name}`,
              position: applicant.title,
              timeAgo: getTimeAgo(applicant.date_created),
              icon: getIconByPosition(applicant.title),
              applicantData: applicant // Store the full applicant data
            };

            // Parse dates for comparison
            const createdDate = new Date(applicant.date_created);
            const updatedDate = new Date(applicant.updated_at);
            
            // Check if this is a new applicant (created in the last 24 hours)
            const isNewApplicant = (now - createdDate) < (24 * 60 * 60 * 1000);
            
            // Check if this applicant hasn't been updated in 3 days
            const needsAttention = updatedDate < threeDaysAgo;

            if (isNewApplicant) {
              // Newly added applicants go to general notifications
              generalNotifications.push({
                ...notificationItem,
                status: applicant.status === "TEST_SENT" ? "Test Sent" : "New Applicant"
              });
            } else if (applicant.status === "BLACKLISTED" || applicant.status === "NOT_FIT") {
              // Blacklisted applicants go to general
              generalNotifications.push({
                ...notificationItem,
                status: "Blacklisted Applicant"
              });
            } else if (needsAttention) {
              // Applicants not updated in 3+ days go to needs attention
              const status = getFormattedStatus(applicant.status, applicant.stage);
              needsAttentionNotifications.push({
                ...notificationItem,
                status,
                timeAgo: `Last updated ${getTimeAgo(applicant.updated_at)}`
              });
            }
          });
        }

        setNotifications({
          general: generalNotifications,
          needsAttention: needsAttentionNotifications
        });
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Helper function to get time ago text from date
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  // Helper function to get icon based on position title
  const getIconByPosition = (position) => {
    if (position.includes("Engineer") || position.includes("Developer")) {
      return <FaCode className="text-gray-600" />;
    } else if (position.includes("Data")) {
      return <FaDatabase className="text-gray-600" />;
    } else if (position.includes("Finance") || position.includes("Financial")) {
      return <FaChartBar className="text-gray-600" />;
    } else if (position.includes("IT") || position.includes("Administrator")) {
      return <FaServer className="text-gray-600" />;
    } else if (position.includes("Media") || position.includes("Graphics")) {
      return <FaCamera className="text-gray-600" />;
    } else {
      return <FaUserTie className="text-gray-600" />;
    }
  };

  // Helper function to format status display
  const getFormattedStatus = (status, stage) => {
    if (status === "FIRST_INTERVIEW") return "First Interview Stage";
    if (status === "SECOND_INTERVIEW") return "Second Interview Stage";
    if (status === "THIRD_INTERVIEW") return "Third Interview Stage";
    if (status === "FOURTH_INTERVIEW") return "Fourth Interview Stage";
    if (status === "FOLLOW_UP_INTERVIEW") return "Follow-up Interview Stage";
    if (status === "FOR_JOB_OFFER" || status === "JOB_OFFER_ACCEPTED" || 
        status === "JOB_OFFER_REJECTED") return "Job Offer";
    if (status === "TEST_SENT") return "Test Sent";
    
    // Fallback to stage if status not recognized
    if (stage === "JOB_OFFER") return "Job Offer";
    if (stage === "INTERVIEW_SCHEDULE") return "Interview Scheduled";
    
    return status.replace(/_/g, " ");
  };

  const getStatusColor = (status) => {
    if (status.includes("New")) return "text-emerald-600";
    if (status.includes("Blacklisted")) return "text-emerald-600";
    if (status.includes("Interview")) return "text-blue-600";
    if (status.includes("Job Offer")) return "text-blue-600";
    if (status.includes("Test")) return "text-blue-600";
    return "text-gray-800";
  };

  const getTimeAgoColor = (timeAgo) => {
    if (timeAgo.includes("Applied")) return "text-emerald-600";
    if (timeAgo.includes("Last updated")) return "text-orange-600";
    return "text-gray-500";
  };

  const handleApplicantClick = (applicant) => {
    onSelectApplicant(applicant);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className=" rounded-lg shadow-lg w-full max-w-md overflow-hidden relative">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Notification</h2>
          <div className="flex border-b border-gray-200">
            <button
              className={`pb-2 px-4 ${
                activeTab === "general" ? "text-emerald-600 border-b-2 border-emerald-600 font-medium" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("general")}
            >
              General
            </button>
            <button
              className={`pb-2 px-4 ${
                activeTab === "needsAttention"
                  ? "text-emerald-600 border-b-2 border-emerald-600 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("needsAttention")}
            >
              Needs Attention
            </button>
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto p-2">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading notifications...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : (
            <>
              {activeTab === "general" && notifications.general.length === 0 && (
                <div className="p-4 text-center text-gray-500">No general notifications</div>  
              )}
              
              {activeTab === "general" &&
                notifications.general.map((notification, index) => (
                  <div
                    key={notification.id || index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2 cursor-pointer"
                    onClick={() => handleApplicantClick(notification.applicantData)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">{notification.icon}</div>
                      <div>
                        <div className="font-medium">{notification.name}</div>
                        <div className="text-sm text-gray-500">{notification.position}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${getStatusColor(notification.status)}`}>{notification.status}</div>
                      <div className={`text-sm ${getTimeAgoColor(notification.timeAgo)}`}>Applied {notification.timeAgo}</div>
                    </div>
                  </div>
                ))}

              {activeTab === "needsAttention" && notifications.needsAttention.length === 0 && (
                <div className="p-4 text-center text-gray-500">No items need attention</div>  
              )}
                
              {activeTab === "needsAttention" &&
                notifications.needsAttention.map((notification, index) => (
                  <div
                    key={notification.id || index}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2 cursor-pointer"
                    onClick={() => handleApplicantClick(notification.applicantData)}
                  >
                    <div className="flex items-center">
                      <div className="mr-3">{notification.icon}</div>
                      <div>
                        <div className="font-medium">{notification.name}</div>
                        <div className="text-sm text-gray-500">{notification.position}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${getStatusColor(notification.status)}`}>{notification.status}</div>
                      <div className={`text-sm ${getTimeAgoColor(notification.timeAgo)}`}>{notification.timeAgo}</div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import useUserStore from '../context/userStore';
import api from '../api/axios';
import applicantDataStore from '../context/applicantDataStore';
import { statusMapping } from '../hooks/statusMapping';

export const useToastManager = () => {
  const [toasts, setToasts] = useState([]);
  const [toastTimeouts, setToastTimeouts] = useState({});
  const { user } = useUserStore();
  const { applicantData, setApplicantData } = applicantDataStore();

  const addToast = (applicant, status, statusMapping) => {
    const toastId = Date.now();
    const newToast = {
      id: toastId,
      applicant,
      status: statusMapping[status] || status,
      previousStatus: statusMapping[applicant.status] || applicant.status
    };

    setToasts(prevToasts => [...prevToasts, newToast]);

    const timeoutId = setTimeout(() => removeToast(toastId), 10000);
    setToastTimeouts(prev => ({ ...prev, [toastId]: timeoutId }));
  };

  const removeToast = (id) => {
    if (toastTimeouts[id]) {
      clearTimeout(toastTimeouts[id]);
      setToastTimeouts(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }

    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const undoStatusUpdate = async (toast) => {
    const { applicant, previousStatus } = toast;
    
    try {
      let data = {
        "user_id": user.user_id,
        "progress_id": applicant.progress_id,
        "status": Object.keys(statusMapping).find(key => statusMapping[key] === previousStatus)
      };

      await api.put(`/applicant/update/status`, data);

      setApplicantData(
        applicantData.map(app =>
          app.applicant_id === applicant.applicant_id
            ? { ...app, status: Object.keys(statusMapping).find(key => statusMapping[key] === previousStatus) }
            : app
        )
      );
      removeToast(toast.id);
    } catch (error) {
      console.error("Undo status update failed:", error);
    }
  };

  return { toasts, addToast, removeToast, undoStatusUpdate };
};
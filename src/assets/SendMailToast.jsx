import React, { useEffect } from 'react';
import { AiOutlineClose, AiOutlineMail } from 'react-icons/ai';

const SendMailToast = ({ toast, removeToast }) => {
  const animationDuration = 5000;

  useEffect(() => {
    if (toast && toast.id) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, animationDuration);

      return () => clearTimeout(timer); // Cleanup if component unmounts early
    }
  }, [toast, removeToast, animationDuration]);

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    
    // Check if animations already exist before adding them
    let slideUpExists = false;
    let shrinkExists = false;
    
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      if (styleSheet.cssRules[i].name === 'slide-up') slideUpExists = true;
      if (styleSheet.cssRules[i].name === 'shrink') shrinkExists = true;
    }
    
    if (!slideUpExists) {
      styleSheet.insertRule(`@keyframes slide-up { 0% { transform: translateY(100%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }`, styleSheet.cssRules.length);
    }
    
    if (!shrinkExists) {
      styleSheet.insertRule(`@keyframes shrink { 0% { width: 100%; } 100% { width: 0; } }`, styleSheet.cssRules.length);
    }
  }, []);

  if (!toast || !toast.id) {
    return null; // Return null if toast is not valid
  }

  return (
    <div className="w-full max-w-md" style={{ animation: `slide-up 0.5s ease-out` }}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex items-center max-w-md overflow-hidden">
        {/* Status indicator */}
        <div className="bg-[#008080] w-2 self-stretch" />

        <div className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-1">
            <AiOutlineMail className="text-[#008080] dark:text-[#66b2b2]" />
            <span className="font-medium text-gray-900 dark:text-white">Send Status</span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {toast.message || "Email has been sent successfully"}
          </p>

          {toast.recipient && (
            <p className="text-xs text-gray-500 mt-1">
              Recipient: {toast.recipient}
            </p>
          )}
        </div>

        <button
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors self-start"
          onClick={() => removeToast(toast.id)}
          aria-label="Close notification"
        >
          <AiOutlineClose size={16} />
        </button>
      </div>

      {/* Progress bar for auto-dismiss */}
      <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-b-lg overflow-hidden -mt-1">
        <div className="absolute inset-0 bg-[#008080] dark:bg-[#66b2b2]" style={{ animation: `shrink ${animationDuration}ms linear` }} />
      </div>
    </div>
  );
};

export default SendMailToast;
import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <FaSpinner className="animate-spin text-6xl text-gray-500" />
    </div>
  );
}

export default Loader;
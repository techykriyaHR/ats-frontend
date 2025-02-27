import React from 'react';

const ApplicationReceived = ({ totalApplications, months }) => {
    return (
        <>
            <h3 className="text-sm text-gray-600 mb-4 text-center">Application Received</h3>
            <p className="text-4xl font-semibold text-center mb-6">{totalApplications}</p>

            <div className="space-y-2">
                {months.map((month, index) => (
                    <div key={index} className="flex justify-between">
                        <span className="font-medium">{month.name}</span>
                        <span className="font-medium">{month.count}</span>
                    </div>
                ))}
            </div>
        </>

    );
};

export default ApplicationReceived;
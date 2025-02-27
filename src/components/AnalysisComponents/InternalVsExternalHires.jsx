import React from 'react';

const InternalVsExternalHires = ({ internalHires = 70, externalHires = 30 }) => {
    const totalHires = internalHires + externalHires;
    const internalPercentage = ((internalHires / totalHires) * 100).toFixed(0);
    const externalPercentage = ((externalHires / totalHires) * 100).toFixed(0);

    return (
        <>
            <h3 className="text-sm text-gray-600 mb-4 text-center">Internal Vs. External Hires</h3>

            <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl font-medium">{internalPercentage}%</span>
                <span className="text-xl text-gray-600">-</span>
                <span className="text-4xl font-medium">{externalPercentage}%</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Internal</span>
                <span className="text-gray-600">External</span>
            </div>
        </>

    );
};

export default InternalVsExternalHires;
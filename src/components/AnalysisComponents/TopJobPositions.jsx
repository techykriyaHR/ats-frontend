import React from 'react';

const TopJobPositions = ({
    jobPositions = [
        { title: "Accountant", percentage: 50 },
        { title: "SA Engineer", percentage: 20 },
        { title: "SA Engineer", percentage: 10 },
        { title: "SA Engineer", percentage: 20 },
    ],
}) => {
    return (
        <>
            <h3 className="text-sm text-gray-600 mb-4 text-center">Top Job Positions Applied For</h3>
            <div className="space-y-2">
                {jobPositions.map((position, index) => (
                    <div key={index} className="flex justify-between">
                        <span className="font-medium">{position.title}</span>
                        <span className="font-medium">{position.percentage}%</span>
                    </div>
                ))}
            </div>
        </>

    );
};

export default TopJobPositions;
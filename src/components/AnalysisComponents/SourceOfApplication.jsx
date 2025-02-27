import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const SourceOfApplication = () => {
    const data = [
        { source: "Referral", value: 50 },
        { source: "Website", value: 30 },
        { source: "Caravan", value: 20 },
    ];

    const chartData = {
        labels: data.map(entry => entry.source),
        datasets: [
            {
                data: data.map(entry => entry.value),
                backgroundColor: ['#008080', '#66b2b2', '#d9ebeb'],
                hoverBackgroundColor: ['#007777', '#5daaaa', '#cce5e5'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${label}: ${percentage}% (${value})`;
                    },
                },
            },
        },
    };

    return (
        <>

            <h3 className="text-sm text-gray-600 mb-4 text-center">Source of Application</h3>

            <div className="w-1/2 mx-auto">
                <Pie data={chartData} options={options} />
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {data.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }} />
                        <span className="text-sm text-gray-700">{entry.source}</span>
                        <span className="ml-auto text-sm font-medium">{entry.value}%</span>
                    </div>
                ))}
            </div>
        </>

    );
};

export default SourceOfApplication;

import React from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportOptions = ({ data, onExportComplete }) => {
  const headers = [
    "Position",
    "Overall applicants per position",
    "Overall applicants per year/month",
    "Active",
    "Pre-screening Test Stage",
    "First Interview Stage",
    "Second Interview Stage",
    "Third Interview Stage",
    "Fourth Interview Stage",
    "For Job Offer",
    "Job offer Accepted",
    "Job offer Rejected",
    "Withdrawn",
    "Not fit",
    "Short-banned (6 months)",
    "Blacklisted (1 year)",
  ];

  const handleExportCSV = () => {
    // Add headers first
    let csv = headers.join(",") + "\n";

    // Add data rows
    csv += data
      .map((row) => {
        return headers
          .map((header) => {
            // Handle special cases where the value might contain commas
            const value = row[header] || "";
            return `"${value}"`;
          })
          .join(",");
      })
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "recruitment_tracking.csv");
    onExportComplete();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF("l", "mm", "a3"); // landscape orientation for better fit

    // Define the table structure
    const tableData = data.map((row) => headers.map((header) => row[header] || ""));

    // Add title
    doc.setFontSize(16);
    doc.text("Recruitment Tracking Report", 14, 15);

    // Add the table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 25,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [200, 220, 200], // Light green for header
        textColor: [0, 0, 0],
        fontSize: 8,
        fontStyle: "bold",
      },
      columnStyles: {
        // Make Position column slightly wider
        0: { cellWidth: 40 },
      },
      didDrawCell: (data) => {
        // Add conditional formatting similar to spreadsheet
        if (data.section === "body") {
          const col = data.column.index;
          // Pink background for rejection/blacklist columns
          if (col >= 11 && col <= 15) {
            data.cell.styles.fillColor = [255, 220, 220];
          }
          // Green background for active column
          else if (col === 3) {
            data.cell.styles.fillColor = [220, 255, 220];
          }
        }
      },
    });

    doc.save("recruitment_tracking.pdf");
    onExportComplete();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-10">
      <button
        className="w-full px-4 py-2 text-left rounded-t-md text-teal-600 hover:bg-teal-600/10"
        onClick={handleExportCSV}
      >
        Export as CSV
      </button>
      <button
        className="w-full px-4 py-2 text-left rounded-b-md text-teal-600 hover:bg-teal-600/10 border-t border-gray-100"
        onClick={handleExportPDF}
      >
        Export as PDF
      </button>
    </div>
  );
};

export default ExportOptions;
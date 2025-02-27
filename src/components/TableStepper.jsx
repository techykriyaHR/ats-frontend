import React from 'react';

export default function TableStepper({ currentPage, totalPages, rowsPerPage, onPageChange, onRowsPerPageChange }) {
  const handleFirst = () => onPageChange(1);
  const handlePrevious = () => onPageChange(Math.max(1, currentPage - 1));
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1));
  const handleLast = () => onPageChange(totalPages);

  return (
    <div className="flex justify-end items-center mt-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="h-8 w-16 border border-gray-300 rounded-md"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="flex items-center gap-1 ml-4">
        <button
          onClick={handleFirst}
          disabled={currentPage === 1}
          className="p-2 hover:bg-muted rounded-sm disabled:opacity-50 disabled:pointer-events-none"
          aria-label="First page"
        >
          &laquo;&laquo;
        </button>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 hover:bg-muted rounded-sm disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Previous page"
        >
          &laquo;
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 hover:bg-muted rounded-sm disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Next page"
        >
          &raquo;
        </button>
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages}
          className="p-2 hover:bg-muted rounded-sm disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Last page"
        >
          &raquo;&raquo;
        </button>
      </div>
    </div>
  );
}
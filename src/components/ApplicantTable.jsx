import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Toast from '../assets/Toast';
import { useApplicantData } from '../hooks/useApplicantData';
import positionStore from '../context/positionStore';
import { initialStages } from '../utils/StagesData';
import { useStages } from '../hooks/useStages';
import applicantFilterStore from '../context/applicantFilterStore';
import useUserStore from '../context/userStore';
import { useToastManager } from '../utils/toastManager';
import { updateStatus } from '../utils/applicantDataUtils';
import { statusMapping } from '../hooks/statusMapping';

const ApplicantTable = ({ onSelectApplicant }) => {
  const { applicantData, setApplicantData, statuses } = useApplicantData();
  const { positionFilter, setPositionFilter } = positionStore();
  const { setStages } = useStages();
  const { status, setSearch, search } = applicantFilterStore();
  const { user } = useUserStore();
  // console.log('user id .....', user.user_id);
  
  const { toasts, addToast, removeToast, undoStatusUpdate } = useToastManager();

  const handleStatusChange = (id, progress_id, newStatus, status) => {
    addToast(applicantData.find(applicant => applicant.applicant_id === id), newStatus, statusMapping);
    updateStatus(id, progress_id, newStatus, status, applicantData, setApplicantData, positionFilter, setStages, initialStages, setPositionFilter, user);
  };

  const handleApplicantRowClick = (row) => {
    const applicant = applicantData.find((applicant) => applicant.applicant_id === row.applicant_id);
    if (applicant) {
      onSelectApplicant(applicant);
    }
    setPositionFilter("All");
    setSearch("");
  };

  const columns = [
    {
      name: 'Date Applied',
      selector: row => moment(row.date_created).format('MMMM DD, YYYY'),
      sortable: true,
    },
    {
      name: 'Applicant Name',
      selector: row => `${row.first_name} ${row.last_name}`,
    },
    {
      name: 'Position Applied',
      selector: row => row.title,
    },
    {
      name: 'Status',
      cell: row => (
        <select
          className='border border-gray-light max-w-[100px]'
          value={row.status}
          onChange={(e) => handleStatusChange(row.applicant_id, row.progress_id, e.target.value, status)}
          style={{ padding: '5px', borderRadius: '5px' }}
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {statusMapping[status] || status}
            </option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <>
      {applicantData.length === 0 && search != "" ? (
        <div className="text-center text-lg font-semibold text-gray-600 mt-8">
          No applicants found.
        </div>
      ) : (
        <DataTable
          pointerOnHover
          highlightOnHover
          striped
          fixedHeaderScrollHeight="60vh"
          responsive
          columns={columns}
          data={applicantData}
          defaultSortAsc={false}
          defaultSortFieldId={1}
          onRowClicked={handleApplicantRowClick}
          pagination
          progressPending={applicantData.length === 0}
          progressComponent={<LoadingComponent />}
        />
      )}
      <div className="fixed top-4 right-4 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            undoStatusUpdate={undoStatusUpdate}
            removeToast={removeToast}
          />
        ))}
      </div>
    </>
  );
};

function LoadingComponent () {
  return (
    <div className="flex flex-col w-full space-y-2">
      <div className=" h-10 animate-pulse rounded-sm bg-gray-light"></div>
      <div className=" h-10 animate-pulse rounded-sm bg-gray-light"></div>
      <div className=" h-10 animate-pulse rounded-sm bg-gray-light"></div>
      <div className=" h-10 animate-pulse rounded-sm bg-gray-light"></div>
      <div className=" h-10 animate-pulse rounded-sm bg-gray-light"></div>
    </div>
  );
};

export default ApplicantTable;
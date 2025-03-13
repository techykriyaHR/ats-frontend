import getFilteredApplicants from "../services/getFilteredApplicants";
import * as XLSX from 'xlsx';
import saveAs  from 'file-saver';

const createExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, `${fileName}.xlsx`);
};

const exportToExcel = async (dateFilter, dateFilterValue, position, status) => {
    
    const applicants = await getFilteredApplicants(dateFilter, dateFilterValue, position, status);
    console.log("applicants: ", applicants);
    console.log("type:", typeof(applicants));
    
    
    createExcel(applicants, "exported-applicants");
}

export default exportToExcel; 
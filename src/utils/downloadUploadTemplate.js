import saveAs from 'file-saver';

const downloadTemplate = async () => {
    try {
        const response = await fetch('/upload-applicant-template.xlsx'); // Access directly from public folder
        if (!response.ok) throw new Error('Network response was not ok');

        const blob = await response.blob();
        saveAs(blob, 'upload-applicant-template.xlsx');
    } catch (error) {
        console.error('Error downloading the template:', error);
    }
}

export default downloadTemplate;
import getFilteredApplicants from "../services/getFilteredApplicants";
import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Link } from "@react-pdf/renderer";
import { format, parseISO } from 'date-fns';

const styles = StyleSheet.create({
  page: { padding: 20, flexDirection: "column" },
  title: { fontSize: 24, marginBottom: 10, textAlign: "center", fontWeight: "bold" },
  description: { fontSize: 14, marginBottom: 15, textAlign: "center" },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1 },
  tableRow: { flexDirection: "row" },
  tableColHeader: {
    width: "11.11%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    backgroundColor: "#eee", 
    padding: 4, 
    textAlign: "center",
    fontSize: 10,
  },
  tableCol: {
    width: "11.11%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    padding: 4, 
    textAlign: "center",
    fontSize: 9,
  },
});

const ExportToPdf = ({ dateFilter, dateFilterValue, position, status }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      const results = await getFilteredApplicants(dateFilter, dateFilterValue, position, status);
      setApplicants(results || []);
    };

    fetchApplicants();
  }, [dateFilter, dateFilterValue, position, status]);

  return (
    <Document>
      <Page style={styles.page} size="A3" orientation="landscape">
        <Text style={styles.title}>Applicant Information Report</Text>
        <Text style={styles.description}>This report provides a summary of applicants filtered by the selected criteria.</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>First Name</Text>
            <Text style={styles.tableColHeader}>Middle Name</Text>
            <Text style={styles.tableColHeader}>Last Name</Text>
            <Text style={styles.tableColHeader}>Gender</Text>
            <Text style={styles.tableColHeader}>Discovered At</Text>
            <Text style={styles.tableColHeader}>CV Link</Text>
            <Text style={styles.tableColHeader}>Date Applied</Text>
            <Text style={styles.tableColHeader}>Mobile 1</Text>
            <Text style={styles.tableColHeader}>Mobile 2</Text>
            <Text style={styles.tableColHeader}>Email 1</Text>
            <Text style={styles.tableColHeader}>Email 2</Text>
            <Text style={styles.tableColHeader}>Email 3</Text>
            <Text style={styles.tableColHeader}>Stage</Text>
            <Text style={styles.tableColHeader}>Status</Text>
            <Text style={styles.tableColHeader}>Title</Text>
          </View>
          {applicants.map((row, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCol}>{row.first_name}</Text>
              <Text style={styles.tableCol}>{row.middle_name || "N/A"}</Text>
              <Text style={styles.tableCol}>{row.last_name}</Text>
              <Text style={styles.tableCol}>{row.gender}</Text>
              <Text style={styles.tableCol}>{row.discovered_at}</Text>
              <Text style={styles.tableCol}>{row.cv_link ? <Link src={row.cv_link}>Link</Link> : "N/A"}</Text>
              <Text style={styles.tableCol}>{row.date_created ? format(parseISO(row.date_created), 'yyyy-MM-dd') : "N/A"}</Text>
              <Text style={styles.tableCol}>{row.mobile_number_1}</Text>
              <Text style={styles.tableCol}>{row.mobile_number_2 || "N/A"}</Text>
              <Text style={styles.tableCol}>{row.email_1}</Text>
              <Text style={styles.tableCol}>{row.email_2 || "N/A"}</Text>
              <Text style={styles.tableCol}>{row.email_3 || "N/A"}</Text>
              <Text style={styles.tableCol}>{row.stage}</Text>
              <Text style={styles.tableCol}>{row.status}</Text>
              <Text style={styles.tableCol}>{row.title}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ExportToPdf;
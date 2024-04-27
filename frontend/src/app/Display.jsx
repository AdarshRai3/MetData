import React from 'react';
import styles from './page.module.css';

const Display = ({ calculatedResult }) => {
  if (!calculatedResult) {
    return <div className={styles.card}>No results to display yet.</div>;
  }

  const getTableHeaders = () => {
    if (!calculatedResult) return [];

    const headers = ['year']; // Always include 'year'

    // Add additional headers based on the first object's properties (assuming consistent structure)
    if (calculatedResult.length > 0) {
      const firstRow = calculatedResult[0];
      headers.push(...Object.keys(firstRow).filter(key => key !== 'year'));
    }

    return headers;
  };

  // Function to build table rows with a single cell per header (horizontal layout)
  const getTableRows = () => {
    if (!calculatedResult) return [];

    const headers = getTableHeaders();

    return calculatedResult.map((rowData) => (
      <tr key={rowData.year}>
        {/* Single cell containing all data for the row */}
        <td key={rowData.year}>
          {headers.map((header) => (
            <span key={header}>
              {header}: {rowData[header]} &nbsp; {/* Add spacing between data points */}
            </span>
          ))}
        </td>
      </tr>
    ));
  };

  const tableHeaders = getTableHeaders();
  const tableRows = getTableRows();

  return (
    <div className={styles.card}>
      <h3>Graphical Representation of the Data:</h3>
      <table>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default Display;
import React from 'react';
import styles from './page.module.css';

const Display = ({ calculatedResult }) => {
  if (!calculatedResult) {
    return <div className={styles.card}>No results to display yet.</div>;
  }

  const getTableHeaders = () => {
    if (!calculatedResult) return [];

    const headers = ['years']; // Starting header for months

    // Add additional headers based on the first object's properties (assuming consistent structure)
    if (calculatedResult.length > 0) {
      const firstRow = calculatedResult[0];
      headers.pop(...Object.keys(firstRow).filter(key => key !== 'years'));
      headers.push(...Object.keys(firstRow).filter(key => key !== 'months'));
    }

    return headers;
  };

  const getTableRows = () => {
    const headers = getTableHeaders();

    return headers.map((header) => (
      <tr key={header}>
        <th className={styles.tableHeader}>{header}</th> {/* Apply style to header */}
        {calculatedResult.map((rowData) => (
          <td key={rowData.year} className={styles.tableCell}>
            {rowData[header]}
          </td>
        ))}
      </tr>
    ));
  };


  const tableRows = getTableRows();

  const tableStyles = {
    border: '1px solid black', 
    borderCollapse: 'collapse', 
    fontFamily: 'monospace',
    fontSize: '1.5rem',
    padding: '0.5rem',
    margin: '1rem'
  };

  return (
    <>
      <div className={styles.card}>
        <h3 className={styles.title}>Graphical Representation of the Data:</h3>
        <table className={styles.dataTable}> {/* Apply style to entire table */}
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Display;


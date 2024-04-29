import React from 'react';
import styles from './page.module.css';
import MonthlyMean from './MonthlyMeanGraph';
import AnnualMean from './AnnualMeanGraph';
import AnnualToTal from './AnnualTotalGraph';
const Display = ({ calculatedResult }) => {
  if (!calculatedResult) {
    return <div className={styles.card}>No results to display yet.</div>;
  }

  const getTableHeaders = () => {
    if (!calculatedResult) return [];

    const headers = ['years']; // Starting header for years

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

  return (
    <>
      <div className={styles.card}>
        <h3 className={styles.title}>Graphical Representation of the Data</h3>
        <table className={styles.dataTable}> {/* Apply style to entire table */}
          <tbody>
            {tableRows}
          </tbody>
        </table>
        <MonthlyMean/>
        <AnnualMean/>
        <AnnualToTal/>
      </div>
    </>
  );
};

export default Display;


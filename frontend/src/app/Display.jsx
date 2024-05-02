import React, { useEffect } from 'react';
import styles from './page.module.css';
import MonthlyMean from './MonthlyMeanGraph';
import AnnualMean from './AnnualMeanGraph';
import AnnualTotal from './AnnualTotalGraph';
const Display = ({ calculatedResult,district, dataType,state,action }) => {

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
       <th className={styles.tableHeader}>{header}</th>
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
      <h3 className={styles.title}>Data Representation of the {`${dataType}`}</h3>
        <table className={styles.dataTable}>
          <tbody>
            {tableRows}
          </tbody>
        </table>
        {/* title */}
      <h5 className={styles.title}>{`${dataType} for ${district} (${state})`}</h5>
        {calculatedResult[0]?.mean && (
          <>
            {action==="monthlyMean" ? <MonthlyMean calculatedResult={calculatedResult} district={district} state={state} dataType={dataType}  /> : <AnnualMean district={district} state={state} dataType={dataType} calculatedResult={calculatedResult}/>}
          </>
        )}
        {calculatedResult[0]?.total && <AnnualTotal district={district} state={state} dataType={dataType} calculatedResult={calculatedResult} />}
       
      </div>
    </>
  );
};

export default Display;


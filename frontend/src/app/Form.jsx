'use client';
import React, { useState, useEffect } from 'react';
import { statesAndDistricts, dataTypes, years } from './SelectData';
import axios from 'axios';
import styles from './page.module.css';
import Display from './Display';

const Form = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDataType, setSelectedDataType] = useState('');
  const [selectedFromYear, setSelectedFromYear] = useState('');
  const [selectedToYear, setSelectedToYear] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [calculatedResult, setCalculatedResult] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      state: selectedState,
      district: selectedDistrict,
      dataType: selectedDataType,
      fromYear: selectedFromYear,
      toYear: selectedToYear,
      action: selectedAction
    };
    try {
      const response = await axios.post('http://localhost:8080/api/formdata', formData);
      if (response.status === 404 && response.status === 500 && response.status === 400) {
        setErrorMessage(response.data.message);
        setCalculatedResult(null);
      } else {
        setErrorMessage('');
        setCalculatedResult(response.data);
      }
    } catch (error) {
      setErrorMessage('*Data you are asking for is not available in the database.');
    }
  };

  useEffect(() => {
    if (selectedState) {
      const stateObj = statesAndDistricts.find(state => state.state === selectedState);
      setSelectedDistrict(stateObj ? stateObj.districts[0] : '');
    }
  }, [selectedState]);
   
  useEffect(() => {
    if (selectedFromYear) {
      const updatedYears = years.filter(year => year >= selectedFromYear);
      setSelectedToYear(updatedYears[0]);
    }
  }, [selectedFromYear, years]);
  
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h1 className={styles.title}>Metrological Data</h1>

        {errorMessage && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
          {errorMessage}
        </div>
       )}
  
        <div>
          <label htmlFor="state">State</label>
          <select id="state" name="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {statesAndDistricts.map((stateObj) => (
              <option key={stateObj.state} value={stateObj.state}>{stateObj.state}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="district">District</label>
          <select id="district" name="district" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
            <option value="">Select District</option>
            {selectedState && statesAndDistricts.find(state => state.state === selectedState)?.districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div> 
  
        <div>
          <label htmlFor="datatype">Datatype</label>
          <select id="datatype" name="datatype" value={selectedDataType} onChange={(e) => setSelectedDataType(e.target.value)}>
          <option value="">Select Datatype</option>
          {dataTypes.map((datatype) => (
             <option key={datatype} value={datatype}>{datatype}</option>
            ))}
         </select>
       </div>

       <div>
          <label htmlFor="fromYear">From</label>
          <select id="fromYear" name="fromYear" value={selectedFromYear} onChange={(e) => setSelectedFromYear(e.target.value)}>
            <option value="">Select From Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
  
        <div>
          <label htmlFor="toYear">To</label>
          <select id="toYear" name="toYear" value={selectedToYear} onChange={(e) => setSelectedToYear(e.target.value)}>
            <option value="">Select To Year</option>
            {years.filter(year => year >= selectedFromYear).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
  
        <div>
          <label htmlFor="action">Select</label>
          <select id="action" name="action" value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)}>
            <option value="">Action</option>
            <option value="annualMean">Generate Annual Mean</option>
            <option value="monthlyMean">Generate Monthly Mean for each year</option>
            <option value="annualTotal">Show Annual Total</option>
          </select>
        </div>
  
        <button type="submit">Display</button>
        
      </form>
      {(errorMessage === '' && calculatedResult && calculatedResult.length > 0) && (
      <Display
       calculatedResult={calculatedResult}
       district={selectedDistrict}
       dataType={selectedDataType}
       state={selectedState}
       action={selectedAction}
      />
   )}
    </>
  )
};

export default Form;

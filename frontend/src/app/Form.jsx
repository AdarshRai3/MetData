'use client'
import React, { useState, useEffect } from 'react';
import { statesAndDistricts, dataTypes, years } from './SelectData';
import styles from './page.module.css';

const Form = () => {
  // State to store the selected options
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDataType, setSelectedDataType] = useState('');
  const [selectedFromYear, setSelectedFromYear] = useState('');
  const [selectedToYear, setSelectedToYear] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Form submitted with options: ${selectedState}, ${selectedDistrict}, ${selectedDataType}, ${selectedFromYear}, ${selectedToYear}, ${selectedAction}`);
  };

  // Update districts based on selected state
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
    </>
  )
};

export default Form;
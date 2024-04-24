import React, { useState } from 'react';

const Form = () => {
  // State to store the selected option
  const [selectedOption, setSelectedOption] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission based on the selected option
    console.log(`Form submitted with option: ${selectedOption}`);
  };

  return (
    <>
       <h1 className="flex h-50 items-center justify-center">Form</h1>
      <form onSubmit={handleSubmit} className="px-3 py-5">
      <div>
        <label htmlFor="state" className="px-5 py-5">State</label>
        <input type="text" id="state" name="state" />
      </div>
  
      <div className="form-group">
        <label htmlFor="district">District</label>
        <input type="text" id="district" name="district" />
      </div>
  
      <div className="form-group">
        <label htmlFor="datatype">Datatype</label>
        <input type="text" id="datatype" name="datatype" />
      </div>
  
      <div className="form-group">
        <label htmlFor="fromYear">From</label>
        <input type="Number" id="fromYear" name="fromYear" />
      </div>
  
      <div className="form-group">
        <label htmlFor="toYear">To</label>
        <input type="Number" id="toYear" name="toYear" />
      </div>
  
      <div className="form-group">
        <label htmlFor="action">Action</label>
        <select id="action" name="action" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="">Select an action</option>
          <option value="annualMean">Generate Annual Mean</option>
          <option value="monthlyMean">Generate Monthly Mean for each year</option>
          <option value="annualTotal">Show Annual Total</option>
        </select>
      </div>
  
      <button type="submit" className="submit-button">Submit</button>
     </form>
    </>
   
  );
  
};

export default Form;

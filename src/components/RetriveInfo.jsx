import React, { useContext, useState } from 'react';
import dataContext from '../context/DataProvider';

function RetriveInfo() {
  const { data } = useContext(dataContext);
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const adharRegex = /^\d{12}$/;

  function handleFind() {
    setError("");

    if (searchValue.length === 0) {
      setError("Please fill out this field");
      return;
    } else if (!adharRegex.test(searchValue)) {
      setError("Aadhaar number must be 12 digits long.");
      return;
    }

    const foundPerson = data.find(person => person.adhar === searchValue);

    if (foundPerson) {
      setResult(foundPerson);
    } else {
      setError("No matching information found.");
      setResult(null);
    }
  }

  return (
    <div className='retrive-wrapper'>
      <div className='retrive-container'>
        <p>Retrieve Information</p>
        <div className='search-container'>
          <div className='search-input'>
            <input 
              type="text" 
              name="searchValue" 
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)} 
              placeholder="Search by Aadhaar" 
            />
            <button onClick={handleFind}>Find</button>
          </div>
        </div>

        <div className='data-div'>
          {result ? (
            <div className="result">
              <p>Name: {result.name}</p>
              <p>Date of Birth: {result.dob}</p>
              <p>Aadhaar: {result.adhar}</p>
              <p>Phone: {result.phone}</p>
              <p>Age: {result.age}</p>
            </div>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <h3>No Data</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default RetriveInfo;

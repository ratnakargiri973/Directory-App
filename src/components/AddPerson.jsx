import React, { useContext, useEffect, useState } from 'react';
import dataContext from '../context/DataProvider';
import AddPersonForm from './AddPersonForm';

function AddPerson() {
  const { data, setData, openForm,setOpenForm } = useContext(dataContext);
  

  function handleDelete(index) {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem('personData', JSON.stringify(updatedData));
  }

  function handleOpenForm() {
    setOpenForm(true);
  }

  useEffect(() => {
    const storedData = localStorage.getItem('personData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [setData]);

  return (
    <div className='addPerson-wrapper'>
      <div className='addPerson-container'>
      <p>Add New Person</p>
      <div className='table-wrapper'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Adhar</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.dob}</td>
                  <td>{item.adhar}</td>
                  <td>{item.phone}</td>
                  <td>{item.age}</td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='person-form'>
      {openForm && <AddPersonForm />}
      </div>
      <div className='addBtn-div'>
      <button onClick={handleOpenForm} className='addNewBtn'>Add New</button>
      </div>
      </div>
    </div>
  );
}

export default AddPerson;

import React, { useContext, useEffect, useState } from 'react';
import dataContext from '../context/DataProvider';

function AddPersonForm() {
  const {
    data,
    setData,
    name,
    setName,
    dob,
    setDob,
    adhar,
    setAdhar,
    phone,
    setPhone,
    age,
    setAge,
    setOpenForm
  } = useContext(dataContext);

  const [nameErr, setNameErr] = useState("");
  const [dobErr, setDobErr] = useState("");
  const [adharErr, setAdharErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const adharRegex = /^\d{12}$/;
  const phoneRegex = /^[7-9]{1}[0-9]{9}$/;

  function handleSubmit(e) {
    e.preventDefault();
  
    setNameErr('');
    setDobErr('');
    setAdharErr('');
    setPhoneErr('');
  
    let isValid = true;
  
    if (name.length === 0) {
      setNameErr("Please fill out this field");
      isValid = false;
    } else if (name.length <= 4) {
      setNameErr("Name size must be more than 4 letters");
      isValid = false;
    } else if (!/^[A-Z][a-zA-Z]*/.test(name)) {
      setNameErr("Name must contain at least one capital letter");
      isValid = false;
    }
  
    if (dob.length === 0) {
      setDobErr("Please fill out this field");
      isValid = false;
    }
  
    if (adhar.length === 0) {
      setAdharErr("Please fill out this field");
      isValid = false;
    } else if (!adharRegex.test(adhar)) {
      setAdharErr("Adhar number must be 12 digits long.");
      isValid = false;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].adhar === adhar) {
          setAdharErr("Adhar number must be unique.");
          isValid = false;
          break; 
        }
      }
    }
  
    if (phone.length === 0) {
      setPhoneErr("Please fill out this field");
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      setPhoneErr("Phone number must be 10 digits long and first number should be from 7-9.");
      isValid = false;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].phone === phone) {
          setPhoneErr("Phone number must be unique.");
          isValid = false;
          break;
        }
      }
    }
  
    if (!isValid) {
      return;
    }
  
    const newPerson = {
      name,
      dob,
      adhar,
      phone,
      age,
    };
  
    const updatedData = [...data, newPerson];
    setData(updatedData);
    localStorage.setItem('personData', JSON.stringify(updatedData));
  
    setName('');
    setDob('');
    setAdhar('');
    setPhone('');
    setAge('');
    setOpenForm(false);
  }
  
  

  function calculateAge() {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
    }
  }

  useEffect(() => {
    calculateAge();
  }, [dob]);

  return (
    <div className="form-wrapper">
      <h3>Fill below form for New Entry</h3>
      <div className="form">
        <div className="form-input">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameErr && <span className="err">{nameErr}</span>}
        </div>

        <div className="form-input">
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {dobErr && <span className="err">{dobErr}</span>}
        </div>

        <div className="form-input">
          <input
            type="number"
            name="adhar"
            placeholder="Enter Adhar No."
            value={adhar}
            onChange={(e) => setAdhar(e.target.value)}
          />
          {adharErr && <span className="err">{adharErr}</span>}
        </div>

        <div className="form-input">
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {phoneErr && <span className="err">{phoneErr}</span>}
        </div>

        <div className="form-input">
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={age}
            readOnly
          />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddPersonForm;

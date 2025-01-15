import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import AddPerson from './components/AddPerson.jsx';
import RetriveInfo from './components/RetriveInfo.jsx';
import AddPersonForm from './components/AddPersonForm.jsx';
import dataContext from './context/DataProvider.jsx';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [adhar, setAdhar] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("Age");
  const [openForm, setOpenForm] = useState(false);
  return (
   <>
    <BrowserRouter>
       <Home />
       <dataContext.Provider value={{
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
          openForm,
          setOpenForm
       }}>
        <Routes>
           <Route path='/' element={<AddPerson />}/>
           <Route path='/retrive-info' element={<RetriveInfo />}/>
        </Routes>
        </dataContext.Provider>
    </BrowserRouter>
   </>
  )
}

export default App;

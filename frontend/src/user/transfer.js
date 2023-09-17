import React, { useState, useEffect } from 'react';
//import Select from "react-select";
import 'bootstrap/dist/css/bootstrap.min.css';
import {v4 as uuidv4} from 'uuid';

let myuuid = uuidv4();
const Transfer = () => {
    // Get session token from local storage
const data = localStorage.getItem('token');
const d = JSON.parse(data);
const fname = d.map( (element) =>  element.fname);
const lname = d.map( (element) =>  element.lname);
const email = d.map( (element) =>  element.email);
    const [amount, setAmount] = useState('');
const [loginError, setLoginError] = useState('');
const [acnos, setAcnos] = useState('');
const [acname, setAcname] = useState('');
const [bankname, setBankname] = useState('');
const [bankcode, setBankcode] = useState('');
//const [banktype, setBanktype] = useState('');
const [acNum, setAcNum] = useState('');

const acnv = async () => {
 // setErrors(validation(values));
  try {
    // send a request to the server to validate the credentials
     await fetch('http://localhost:8080/acv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({acNum, bankcode})
    })
    .then((response) => response.json())
       .then((data) => {
        const v = JSON.stringify(data)
  const va = JSON.parse(v);
  const vas = va.map((element) =>  element.status);
  const vac = va.data.map( (element) =>  element.account_number);
  const vacn = va.data.map( (element) =>  element.account_number);
  alert(vas)
if (vas === true) {
  var y = document.getElementById("amount");
  y.removeAttribute("disabled");
  setAcnos(vac)
  setAcname(vacn)
}
       }) } catch (error) {
          console.error(error);
          setLoginError('An error occurred. Please try again later');
        }
      }
if (acNum){
  var x = document.getElementById("acNum").value;
  if(x.length === 10){
    acnv()
  } 
}else{
 // document.getElementById("amount").disabled = true;
}

useEffect(() => {
    // send a request to the server to validate the credentials
     fetch('http://localhost:8080/bankname',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    .then((response) => response.json())
       .then((data) => {
if (data) {
  const bkn = JSON.stringify(data)
  const b = JSON.parse(bkn);
  const arrayOfLists = b.data.map(
    record => <option value={record.code}>{record.name}</option>
  )
setBankname(arrayOfLists)
}
       }).catch ((error)=> {
          console.error(error);
      })
    }, []);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
   // setErrors(validation(values));
    try {
      // send a request to the server to validate the credentials
       await fetch('http://localhost:8080/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, amount, myuuid })
      })
      .then((response) => response.json())
         .then((data) => {
console.log(data);
if (data) {
  console.log("response successful")
  
}
         }) } catch (error) {
            console.error(error);
            setLoginError('An error occurred. Please try again later');
          }
        }
        
  return (
    <div className = "d-flex justify-content-center align-items-center bg-primary vh-100">
    <div className = "bg-white p-3 rounded w-100%">
      <p>welcome {fname} {lname}</p>
  <hr/>
  <div>
    <form action = "" onSubmit = {handleSubmit}>
    <div class="input-group mb-3">
  <div class="input-group-prepend">
    <label class="input-group-text" for="bn">Bank Name</label>
  </div>
  <select class="custom-select" id="bn" onChange={(e) => setBankcode(e.target.value)} >
  {bankname}
  </select>
</div>
    <div className = "mb-3">
    <label htmlFor="acNum"><strong> Enter Account Number </strong></label>
    <input type="number" maxlength="10" name="acNum" id='acNum' required value={acNum} placeholder="Enter your account Number" onChange={(e) => setAcNum(e.target.value)} className = "form-control rounded-0">
    </input>
    {acname && <div class="alert alert-success" role="alert">{acname}</div>}
    </div>
    <div className = "mb-3">
    <label htmlFor="amount"><strong> Enter Amount </strong></label>
    <input type="number" id='amount' name="amount" disabled value={amount} placeholder="Enter your amount" onChange={(e) => setAmount(e.target.value)} className = "form-control rounded-0">
    </input>
    
    </div>
    <div className = "mb-3">
    {loginError && <div className="text-danger">{loginError}</div>}
    <div><br/>
    <button type ="submit" className=" btn btn-info form-control"> Pay </button>
    </div>
    <p></p>
    <p>Please verify receipient and amount before sending</p>
     
    </div>
    </form>
    </div>
    </div>
    </div>
  );
};
  
export default Transfer;
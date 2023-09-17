import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
  
const Message = () => {
    // Get session token from local storage
const data = localStorage.getItem('token');
const d = JSON.parse(data);
const fname = d.map( (element) =>  element.fname);
const lname = d.map( (element) =>  element.lname);
const email = d.map( (element) =>  element.email);
    const [amount, setAmount] = useState('');
const [loginError, setLoginError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
   // setErrors(validation(values));
    try {
      // send a request to the server to validate the credentials
       await fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, amount })
      })
      .then((response) => response.json())
         .then((data) => {
console.log(data);
if (data) {
  console.log("response successful")
  window.location.href= data;
  
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
    <div className = "mb-3">
    <label htmlFor="amount"><strong> Transfer </strong></label>
    <input type="text" name="amount" value={amount} placeholder="Enter your amount" onChange={(e) => setAmount(e.target.value)} className = "form-control rounded-0">
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
  
export default Message;
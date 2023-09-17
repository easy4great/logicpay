import React, { useState } from 'react';
//import validation from './RegisterValidation';
import { Link, useNavigate} from 'react-router-dom';
//import axios from 'axios';


function Register() {
     const navigate = useNavigate();
//const [errors, setErrors] = useState({});
const [fname, setFname] = useState('');
const [lname, setLname] = useState('');
const [tel, setTel] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [regError, setRegError] = useState('');
const handleSubmit = async (e) => {
    e.preventDefault();
   // setErrors(validation(values));
    try {
      // send a request to the server to validate the credentials
       await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fname, lname, tel, email, password })
      }).then(res => {
            console.log(res);
            if(res.data === "email already exist"){
        alert("email already existed");
}else if (res.result) {
    navigate('/login');
}
        }); 
    
}catch (error) {
      console.error(error);
      setRegError('An error occurred. Please try again later');
    }
}
  return (
     <div className = "d-flex justify-content-center align-items-center bg-primary vh-100">
    <div className = "bg-white p-3 rounded w-100%">
    <h2> Account Opening Form </h2>
    <form action = "" onSubmit = {handleSubmit}>
    <div className = "mb-3">
    <label htmlFor="fname"><strong> First Name </strong></label>
  <input type="text" name="fname" value={fname} placeholder="Enter your Surname" onChange={(e) => setFname(e.target.value)} className = "form-control rounded-0">
    </input>
     
    </div>
    
    <div className = "mb-3">
    <label htmlFor="lname"><strong> Last Name  </strong> </label> 
    <input type="text" name="lname" value={lname} placeholder="Enter your Name" onChange={(e) => setLname(e.target.value)} className = "form-control rounded-0">
    </input>
    </div>
     <div className = "mb-3">
    <label htmlFor="phone"><strong> Phone Number </strong></label>
  <input type="number" name="tel" value={tel} placeholder="Enter your Phone Number" onChange={(e) => setTel(e.target.value)} className = "form-control rounded-0">
    </input>
     
    </div>
    
    <div className = "mb-3">
    <label htmlFor="email"><strong> email  </strong> </label> <input type="text" name="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} className = "form-control rounded-0">
    </input>
    
    </div>
    <div className = "mb-3">
    <label htmlFor="password"><strong>  password </strong> </label>
     <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className = "form-control rounded-0">
    </input>
     
    </div>
    <div className = "mb-3">
     {regError && <div className="text-danger">{regError}</div>}
    <button type ="submit" className=" btn btn-success form-control text-decoration-none"> Create Accout</button>
    <div><br/>
     <Link to = "/login" className=" btn btn-info form-control"> Login </Link>
    </div>
    <p></p>
    <p>Registering here implies agreement to our terms and conditions</p>
     
    </div>
    </form>
    </div>
    </div>
  );
};
  
export default Register;
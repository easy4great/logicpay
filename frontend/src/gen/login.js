import React, { useState } from 'react';
//import validation from './LoginValidation';
import { Link, useNavigate} from 'react-router-dom';
//import axios from 'axios';

function Login({ setLoggedIn }) {
    const navigate = useNavigate();
//const [errors, setErrors] = useState({});
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
   // setErrors(validation(values));
    try {
      // send a request to the server to validate the credentials
       await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then((response) => response.json())
         .then((data) => {
if (data.user) {
    const u = data.user;
   // const uname =u.map(un => un.email);
   // const upassword = u.map(un => un.password);
  //  const d = [uname, upassword];
            localStorage.setItem('token', JSON.stringify(u));
        setLoggedIn(true);
    navigate('/user');
}else if (data.error) {
    setLoginError(data.error)
}
         })
    } catch (error) {
      console.error(error);
      setLoginError('An error occurred. Please try again later');
    }
  }
  return (
    <div className = "d-flex justify-content-center align-items-center bg-primary vh-100">
    <div className = "bg-white p-3 rounded w-100%">
      <h2> Login </h2>
    <form action = "" onSubmit = {handleSubmit}>
    <div className = "mb-3">
    <label htmlFor="email"><strong> email </strong></label>
    <input type="text" name="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} className = "form-control rounded-0">
    </input>
    
    </div>
    <div className = "mb-3">
    <label htmlFor="password"><strong>  password </strong> </label>
    <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className = "form-control rounded-0">
    </input>

    </div>
    <div className = "mb-3">
    {loginError && <div className="text-danger">{loginError}</div>}
    <Link to = "/register"  className=" btn btn-success form-control text-decoration-none"> Create Accout</Link>
    <div><br/>
    <button type ="submit" className=" btn btn-info form-control"> Login </button>
    </div>
    <p></p>
    <p>Registering here implies agreement to our terms and conditions</p>
     
    </div>
    </form>
    </div>
    </div>
  );
};
  
export default Login;
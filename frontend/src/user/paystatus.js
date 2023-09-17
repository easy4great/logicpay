import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSearchParams} from "react-router-dom";
import '../logic.css'
const Paystatus = () => {
    // Get session token from local storage
const data = localStorage.getItem('token');
const d = JSON.parse(data);
const fname = d.map( (element) =>  element.fname);
const lname = d.map( (element) =>  element.lname);
const[searchParams, setSearchParams] = useSearchParams();
const payv = searchParams.get("reference");


  return (
    <body>
      <div className='cnt'>
      <div className='a'>
<p><h> Hello </h><h> {fname} {lname} </h></p>
      </div>
      <div className='c'>
      <table>
          <tr><td>{payv}</td>
           </tr>
        </table>
        </div>
      </div>
    </body>
  );
};
  
export default Paystatus;
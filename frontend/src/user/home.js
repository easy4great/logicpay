import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../logic.css'
const Home = () => {
    // Get session token from local storage
const data = localStorage.getItem('token');
const d = JSON.parse(data);
const fname = d.map( (element) =>  element.fname);
const lname = d.map( (element) =>  element.lname);
const [curz, setCurz] = useState('');
const [balance, setBalance] = useState('');
useEffect(() => {
    // send a request to the server to validate the credentials
     fetch('http://localhost:8080/totalamt',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    .then((response) => response.json())
       .then((data) => {
if (data) {
  const acbal = JSON.stringify(data)
  const b = JSON.parse(acbal);
const cur = b.map( (element) =>  element.currency);
const bl = b.map( (element) =>  element.balance) / 100;
var bal = bl.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
setCurz(cur)
setBalance(bal)
}
       }).catch ((error)=> {
          console.error(error);
      })
    }, []);
    
  return (
    <body>
      <div className='cnt'>
      <div className='a'>
<p><h> Hello </h><h> {fname} {lname} </h></p>
      </div>
      <div className='b'>
      <table>
          <tr><td><a href='/user/notice'>Notification(s) </a></td><td>Available Balance</td> <td><a href='/user/trx'>Transaction History</a> </td>
           </tr>
           <tr><td></td><td className='am'>{curz} {balance}</td></tr>
           <tr> <td><a href='/user/paystack'>Add Money</a> </td> <td><a href='/user/transfer'> Transfer</a> </td>
           <td><a href='/user'> Withdraw</a> </td>
           </tr>
        </table>
        </div>
      <div className='c'>
        <table>
          <tr> <td><a href='/user'>Airtime </a> </td> <td><a href='/user'>Data </a> </td>
          <td><a href='/user'>Betting </a> </td><td><a href='/user'>TV </a> </td>
           </tr>
           <tr> <td><a href='/user'>Electricity</a> </td> <td><a href='/user'> Internet</a> </td>
          <td><a href='/user'>Refer and Earn </a> </td><td><a href='/user'>More </a> </td>
           </tr>
        </table>
      </div>
      <div className='d'>

      </div>
      </div>
    </body>
  );
};
  
export default Home;
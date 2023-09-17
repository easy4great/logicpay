require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require ("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
app.use(cors ());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//const HttpsAgent = require('agentkeepalive').HttpsAgent;
//const agent = new HttpsAgent({
  //freeSocketTimeout: 0.5
//});
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT
const db = mysql.createPool({
  connectionLimit: 1000,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
});
const port = process.env.PORT
app.listen(port, 
()=> console.log(`Server Started on port ${port}...`));

db.getConnection( (err, connection)=> {   if (err) throw (err);
 console.log ("DB connected successful: " + connection.threadId)});
  
   //app.use(express.json());
//middleware to read req.body.<params>
//CREATE USER

//const password = "Admin@123"

  
app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
});
app.post("/register", (req, res) => {
  db.getConnection( async (err, connection) => 
{ if (err) throw (err); 
//const sqlInsert = "INSERT INTO users VALUES (0,?,?)"
  });
  const email = req.body.email;  
const sqlSearch = "SELECT email FROM users WHERE email = ? ";
const search_query = db.query(sqlSearch,[email], function (err, data){
    if(data.length > 0){
      return res.json("email already exist");
    }else{
    const sqlInsert = "INSERT INTO users(email, password, fname, lname, tel, accnum) VALUES (?)";
    const cr8card = "INSERT INTO card(nin, accnum, acctype, fname, lname, cardnum, validate, bkpin, accbal) VALUES (?)"; 
    //generate random whole number
    const nin = Math.floor((Math.random() * 1000000000) + 1);
    const pnum = req.body.tel;
    const accnum = pnum.substr(1, pnum.length - 1);
    const acctype = 'saving';
    const cardnum = Math.floor((Math.random() * 1000000000000) + 1);
    const validate = '12/30';
    const bkpin = Math.floor((Math.random() * 1000) + 1);
    const accbal = Math.floor((Math.random() * 10000) + 1);
    const fname = req.body.fname;  
    const lname = req.body.lname; 
    const tel = req.body.tel; 
    const email = req.body.email;  
    const cardval = [nin, accnum, acctype, fname, lname, cardnum, validate, bkpin, accbal];
    db.query(cr8card, [cardval], function(err, result) { if (err) console.log("[mysql error]",err);
      console.log("Numbers of inserted rows; " + result.affectedRows);
    });
    const pass = JSON.stringify(req.body.password); 
    const password = JSON.parse(pass);
    console.log(password);
  const phash = bcrypt.hash(password, 10, function(err, phash) {
    console.log('Hash: ', phash)
  const values = [email, phash, fname, lname, tel, accnum]; 
    db.query(sqlInsert, [values], function(err, result) { if (err) console.log("[mysql error]",err);
     console.log("Number of records inserted: " + result.affectedRows);
     const responseData = {"status": 200, "error": null, "result": result.affectedRows}
     res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(responseData));
      //return res.json(responseData);
    } );

       });
     //const result = {};

    }
})    

});
  app.post("/login", (req, res) => {
    const email = req.body.email; 
const sqlSearch = "SELECT password FROM users WHERE email = ? ";
const search_query = db.query(sqlSearch,[email], function (err, data){
    if(data.length > 0){
        const d = JSON.stringify(data);
  data.map((d) => {
      dhpas = d.password;
const password = req.body.password;
    bcrypt.compare(password, dhpas, function(err, result) {
    if (result === true) {
const sql = "SELECT fname, lname, tel, email, accnum, acctype, acbal FROM users WHERE email = ?";
      db.query(sql, [email], function (err, response, fields){
          if(err){ console.log("[mysql error]", err);  }else if (response.length > 0){
        //return res.json("successful");
        const responseData = {"status": 200, "error": null, "user": response}
     res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify(responseData));
          }
      });
    }else{
res.send({"error": "Wrong username and or password2"})    
          }
      })
     
    })
    }else{
res.send({"error": "Wrong username and or password3"})    
          }
});
    
});

  
app.post("/totalamt", function(req, response){
  const https = require('https')
 console.log('balance');
  
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/balance',
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_test_79f592114268ca32a474029ffa12eb3ff115c28a'
    }
  }
  const reqt = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
        const pdata = (JSON.parse(data));
       //const paydata = JSON.parse(pdata.data.authorization_url);
        console.log(pdata.data);
        //res.send(JSON.stringify(paydata));
        const paydata = JSON.stringify(pdata.data);
        response.send(paydata);
    })
  }).on('error', error => {
    console.error(error)
  })
  reqt.end()
});

app.post("/addmoney", function(req, response){
  const https = require('https')
  const mail = req.body.email;
  const email = (mail.toString());
  const params = JSON.stringify({
    "email": email,
    "amount": req.body.amount *100,
    "first_name": req.body.fname,
    "last_name": req.body.lname  
  })
  console.log(params);
  console.log('hello');
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: 'Bearer sk_test_79f592114268ca32a474029ffa12eb3ff115c28a',
      'Content-Type': 'application/json'
    }
  }
  
  const reqt = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      if(res !== ""){
        const pdata = (JSON.parse(data));
       //const paydata = JSON.parse(pdata.data.authorization_url);
        console.log(pdata.data.authorization_url);
        //res.send(JSON.stringify(paydata));
        const paydata = JSON.stringify(pdata.data.authorization_url);
        response.send(paydata);
      }
    })
  }).on('error', error => {
    console.error(error)
  })
  
  reqt.write(params)
  reqt.end()
});


app.post("/bankname", function(req, response){
  const https = require('https')
  const params = JSON.stringify({
    "source": "balance",
    "amount": req.body.amount*100,
    "reference": req.body.myuuid,
    "recipient": "RCP_t0ya41mp35flk40",
    "reason": "Holiday Flexing"
  })
  console.log(params);
  console.log('hello');
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/bank?currency=NGN',
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_test_79f592114268ca32a474029ffa12eb3ff115c28a'
    }
  }
  
  const reqt = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      if(res !== ""){
        const pdata = (JSON.parse(data));
       //const paydata = JSON.parse(pdata.data.authorization_url);
        console.log(pdata);
        //res.send(JSON.stringify(paydata));
        const paydata = JSON.stringify(pdata);
        response.send(paydata);
      }
    })
  }).on('error', error => {
    console.error(error)
  })
  
  reqt.write(params)
  reqt.end()
});




app.post("/acv", function(req, response){
  const acnn = req.body.acNum;
  const bkc = req.body.bankcode; 
  console.log(acnn, bkc)
  const https = require('https')
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/bank/resolve?account_number='+acnn+'&bank_code='+bkc,
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_test_79f592114268ca32a474029ffa12eb3ff115c28a'
    }
  }
  
  const reqt = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      if(res !== ""){
        const pdata = (JSON.parse(data));
       //const paydata = JSON.parse(pdata.data.authorization_url);
        console.log(pdata);
        //res.send(JSON.stringify(paydata));
        const paydata = JSON.stringify(pdata);
        response.send(paydata);
      }
    })
  }).on('error', error => {
    console.error(error)
  })
  
  reqt.end()
});
  
app.post("/verify", function(req, response){
  const https = require('https')
  const params = req.body.payverify;
  console.log(params);
 console.log('hello');
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/verify/'+params,
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_test_79f592114268ca32a474029ffa12eb3ff115c28a'
    }
  }
  
  const reqt = https.request(options, res => {
    let data = ''
  
    res.on('data', (chunk) => {
      data += chunk
    });
  
    res.on('end', () => {
      if(res !== ""){
        const pdata = (JSON.parse(data));
        console.log(pdata.data);
        const paydata = JSON.stringify(pdata.data);
        response.send(paydata);
      }
    })
  }).on('error', error => {
    console.error(error)
  })
  
  reqt.write(params)
  reqt.end()

});
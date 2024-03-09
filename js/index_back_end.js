const morgan = require('morgan');
const express = require('express');
const cors = require("cors");
const router = require('express-promise-router')();


const oracledb = require('oracledb');

const config = {
    user: "c##Banking",
    password: "ilovenitu",
    connectString: "localhost/orcl"
  }

const app = require('express')();

app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use(cors())

const PORT = 4000;


app.get('/getRequest', async (req,res)=>{
    const con = await oracledb.getConnection(config);

    const data = await con.execute("INSERT into test1 VALUES(`12')");
    console.log(data.rows)
    res.send("hello this is a successful request")
});

app.post('/login', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("hello")
    console.log(req.body.username)

    const username = req.body.firstName;
    const password = req.body.password;

    console.log(username);

    const command = "INSERT INTO TESTUSER VALUES('" + username + "','" + password + "')";

    //const command = "select * from user1";

    await con.execute(command)
    con.commit();

    //console.log(data.rows)


})



//code 


app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});
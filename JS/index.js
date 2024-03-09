
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const router = require('express-promise-router')();
var nodemailer = require('nodemailer')
const oracledb = require('oracledb');

const config = {
    user: "hr",
    password: "hr",
    connectString: "localhost/orcl"
}

const app = require('express')();

app.use(express.json());
app.use(morgan("dev"));
app.use(router);
app.use(cors());

const PORT = 4000;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user: 'omlan2793@gmail.com',
        pass: "jxgi eycx tnlt vkfv"
    }
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});




app.post('/login', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("sign uppppp")
    console.log(req.body.name)

    const username = req.body.name;
    const email    = req.body.email;
    const password = req.body.password;
    const code = req.body.code;
    const account_type = req.body.account_type;
    

 

    const command = "INSERT INTO PAYMENT VALUES('" + username + "','" + email + "','" + password + "','" + 0 + "', '" + account_type + "')";

    //const command = "select * from user1";

    await con.execute(command)
    con.commit();

 

    res.send("ok")

 
})

app.post('/login-search', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const email = req.body.email;
    const password = req.body.password;

    const command = "SELECT PASSWORD FROM USER_INFO WHERE EMAIL ='" + email + "'";
    
    const result = await con.execute(command);
   
   
    
    let response;

    if (result.rows.length > 0) {
        if (result.rows[0][0] === password) {
            response = 1;
        } else {
            response= 0;
        }
    } else {
        response = 0;
    }

    console.log(response)

    

    res.json(response);
});



app.post('/login_agent', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const email = req.body.email;
    const password = req.body.password;

    const command = "SELECT PASSWORD FROM AGENT_INFO WHERE EMAIL ='" + email + "'";
    
    const result = await con.execute(command);
   
   
    
    let response;

    if (result.rows.length > 0) {
        if (result.rows[0][0] === password) {
            response = 1;
        } else {
            response= 0;
        }
    } else {
        response = 0;
    }

    console.log(response)

    

    res.json(response);
});



app.post('/login_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const email = req.body.email;
    const password = req.body.password;

    const command = "SELECT PASSWORD FROM PAYMENT WHERE EMAIL ='" + email + "'";
    
    const result = await con.execute(command);
   
   
    let response;

    if (result.rows.length > 0) {
        if (result.rows[0][0] === password) {
            response = 1;
        } else {
            response= 0;
        }
    } else {
        response = 0;
    }

    console.log(response)

    

    res.json(response);
});



app.post('/login_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const email = req.body.email;
    const password = req.body.password;

    const command = "SELECT PASSWORD FROM SHOPPING WHERE EMAIL ='" + email + "'";
    
    const result = await con.execute(command);
   
   
    let response;

    if (result.rows.length > 0) {
        if (result.rows[0][0] === password) {
            response = 1;
        } else {
            response= 0;
        }
    } else {
        response = 0;
    }

    console.log(response)

    

    res.json(response);
});



app.post('/verify', async (req, res) => {
    console.log("hi verify");
    console.log(req.body);
    console.log(req.body.email);
    const email = req.body.email;
    console.log(email);

    const con = await oracledb.getConnection(config);

    const command = `SELECT CODE FROM CODE WHERE EMAIL='${email}'`;

    const result = await con.execute(command);

    console.log(result.rows); // Check the structure of the result

    let isCodeValid = false;

    if (result.rows.length > 0) {
        const storedCode = result.rows[0][0]; // Access the code from the first row
        if (req.body.code === storedCode) {
            isCodeValid = true;
        }
        console.log(storedCode);
    }

    console.log(isCodeValid);
    res.send(isCodeValid);
});


app.post('/create_agent', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const username = req.body.name;
    const email    = req.body.email;
    const password = req.body.password;
    const code = req.body.code;
    let balance = 0;
    let balanceNumber = Number(balance);


    const command2 = `INSERT INTO AGENT_INFO VALUES('${username}','${email}', '${password}', '${balanceNumber}')`;
    
    //const command = "select * from user1";

    await con.execute(command2)
    con.commit();
    res.send({})
})

app.post('/remove-code', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("sign uppppp")
    console.log(req.body.name)

    const username = req.body.name;
    const email    = req.body.email;
    const password = req.body.password;
    const code = req.body.code;
    

 
 
    const command1 = "DELETE FROM CODE"

    await con.execute(command1)
    con.commit();

console.log(email)
 

    res.send("ok")
})



app.post('/update', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("sign uppppp")
    console.log(req.body.email)

    const email    = req.body.email;
    const password = req.body.password;
    

 
 
    const command = "UPDATE USER_INFO SET PASSWORD = '"+password+"' WHERE EMAIL = '"+email+"'";

    await con.execute(command)
    con.commit();

    res.send("ok")
})


app.post('/update_user', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("sign uppppp")
    console.log(req.body.email)

    const email    = req.body.email;
    const password = req.body.newPass;
    
    console.log(req.body)

    const command = "UPDATE USER_INFO SET PASSWORD = '"+password+"' WHERE EMAIL = '"+email+"'";

    await con.execute(command)
    con.commit();

    res.send("ok") 
})


app.post('/update_agent', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("sign uppppp")
    console.log(req.body.email)

    const email    = req.body.email;
    const password = req.body.new_pass;
    

 
 
    const command = "UPDATE AGENT_INFO SET PASSWORD = '"+password+"' WHERE EMAIL = '"+email+"'";

    await con.execute(command)
    con.commit();

    res.send("ok")

})



app.post('/update_payment', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("sign uppppp")
    console.log(req.body.email)

    const email    = req.body.email;
    const password = req.body.new_pass;
    

 
 
    const command = "UPDATE PAYMENT SET PASSWORD = '"+password+"' WHERE EMAIL = '"+email+"'";

    await con.execute(command)
    con.commit();

    res.send("ok")

})



app.post('/update_shopping', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("sign uppppp")
    console.log(req.body.email)

    const email    = req.body.email;
    const password = req.body.new_pass;
    

 
 
    const command = "UPDATE SHOPPING SET PASSWORD = '"+password+"' WHERE EMAIL = '"+email+"'";

    await con.execute(command)
    con.commit();

    res.send("ok")

})


// Server-side Node.js code
app.post('/pass_check_user', async (req, res) => {
    try {
        const { email, currPass } = req.body;

        const con = await oracledb.getConnection(config);

        const command = `SELECT PASSWORD FROM USER_INFO WHERE EMAIL = :email`;
        const passRow = await con.execute(command, [email]);
        
        if (passRow.rows.length === 0) {
            return res.send(false); // User not found
        }

        const storedPass = passRow.rows[0][0];
        
        if (currPass === storedPass) {
            res.send(true); // Passwords match
        } else {
            res.send(false); // Passwords don't match
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred on the server");
    }
});


app.post('/pass-check', async(req, res) => {
    console.log("heeeeeelllllloo")
    console.log(req.body)
    console.log(req.body.email)
    console.log(req.body.curr_pass)

    const con = await oracledb.getConnection(config);

    const command = `SELECT PASSWORD FROM USER_INFO WHERE EMAIL='${req.body.email}'`
    const pass_row = await con.execute(command);

    let result;

    console.log(pass_row.rows[0][0])

    
    if (req.body.curr_pass === pass_row.rows[0][0]) {
        result = "true"
    } else {
        result = 'false'
    }

    console.log(result);

    res.send(result)
})


app.post('/pass_check', async(req, res) => {
    console.log("heeeeeelllllloo")
    console.log(req.body)

    const con = await oracledb.getConnection(config);

    const command = `SELECT PASSWORD FROM AGENT_INFO WHERE EMAIL='${req.body.email}'`;
    const pass_row = await con.execute(command);

    let result;

   //\\ console.log("dulal")
    console.log(pass_row.rows[0][0])

    
    if (req.body.curr_pass === pass_row.rows[0][0]) {
        result = "true";
    } else {
        result = 'false';
    }

    console.log(result);

    res.send(result)
})



app.post('/pass_check_agent', async (req, res) => {
    try {


        const con = await oracledb.getConnection(config);

        console.log("heeeeeelllllloo");
        console.log(req.body);
        const email = req.body.email;
        const curr_pass = req.body.current_pass;

        // Using bind variables to prevent SQL injection
        const result = await con.execute(
            `BEGIN :result := validity_email_agent(:email, :curr_pass); END;`,
            {
                email: email,
                curr_pass: curr_pass,
                result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            }
        );

        const isValid = result.outBinds.result === 1;
        console.log(isValid);
        res.send(isValid);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



app.post('/pass_check_payment', async (req, res) => {
    try {


        const con = await oracledb.getConnection(config);

        console.log("heeeeeelllllloo");
        console.log(req.body);
        const email = req.body.email;
        const curr_pass = req.body.current_pass;

        const result = await con.execute(
            `BEGIN :result := validity_email_payment(:email, :curr_pass); END;`,
            {
                email: email,
                curr_pass: curr_pass,
                result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            }
        );

        const isValid = result.outBinds.result === 1;
        console.log(isValid);
        res.send(isValid);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



app.post('/pass_check_shopping', async (req, res) => {
    try {


        const con = await oracledb.getConnection(config);

        console.log("heeeeeelllllloo");
        console.log(req.body);
        const email = req.body.email;
        const curr_pass = req.body.current_pass;

        const result = await con.execute(
            `BEGIN :result := validity_email_shopping(:email, :curr_pass); END;`,
            {
                email: email,
                curr_pass: curr_pass,
                result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
            }
        );

        const isValid = result.outBinds.result === 1;
        console.log(isValid);
        res.send(isValid);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/delete', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const command = `DELETE FROM USER_INFO WHERE EMAIL='${req.body.email}'`
    await con.execute(command);

    con.commit();

    res.send("ok")
})


app.post('/delete_agent', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const command = `DELETE FROM AGENT_INFO WHERE EMAIL='${req.body.email}'`
    await con.execute(command);

    con.commit();

    res.send("ok")
})



app.post('/delete_payment', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const command = `DELETE FROM PAYMENT WHERE EMAIL='${req.body.email}'`
    await con.execute(command);

    con.commit();

    res.send("ok")
})



app.post('/delete_shopping', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const command = `DELETE FROM SHOPPING WHERE EMAIL='${req.body.email}'`
    await con.execute(command);

    con.commit();

    res.send("ok")
})


app.post('/balance', async (req, res) => {
    try {
        const con = await oracledb.getConnection(config);
        
        
        const command = `
            BEGIN
                SELECT BALANCE INTO :balance FROM USER_INFO WHERE EMAIL = :email;
            END;`;
        
        const binds = {
            email: req.body.email,
            balance: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } 
        };
        
       
        const result = await con.execute(command, binds);
        
        
        if (result.outBinds.balance !== null) {
            const balance = result.outBinds.balance;
            res.json({ balance });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.post('/cashout', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const agentemail = req.body.agentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    console.log(agentemail);
    console.log(password);
    console.log(amount);
    console.log(youremail);
    console.log(reference);

    console.log(req.body);

    const agent_result = await con.execute(
        `BEGIN :agent_result := validity_email_agent2(:agentemail); END;`,
        {
            agent_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           agentemail: agentemail,
        }
    );

    console.log(agent_result);


    const your_result = await con.execute(
        `BEGIN :your_result := validity(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_user(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );

    const charge = (10/1000) * amount
    const bal = your_result2.outBinds.your_result2 - charge;

    let num = 0;

    console.log(agent_result.outBinds.agent_result);
    console.log(your_result.outBinds.your_result);
    if (agent_result.outBinds.agent_result === 1 && bal >= amount) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :agentemail`,
            {
                amount: amount,
                agentemail: agentemail
            }
        );
        console.log('agent')
        const resultUpdate2 = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE - (:amount + :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );

        const admin = "dulalhossain71579@gmail.com"

        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );
        
        console.log(youremail)
        console.log(reference);

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;

        const cash="cashout";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${agentemail}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}', '${charge}' )`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});




app.post('/sendmoney_agent', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const email = req.body.email;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    console.log(req.body);


    const result = await con.execute(
        `BEGIN :result := validity_email_agent(:youremail, :password); END;`,
        {
            result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    const result2 = await con.execute(
        `BEGIN :result2 := validity_email_agent2(:email); END;`,
        {
            result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            email: email,
        }
    );


    const result3 = await con.execute(
        `BEGIN :result3 := validity_user(:email); END;`,
        {
            result3: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            email: email,
        }
    );


    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_agent(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );
    const admin = "dulalhossain71579@gmail.com";
    const charge = 5;
    const bal = your_result2.outBinds.your_result2 - charge;


    let num = 0;

    console.log(result.outBinds.result);
    console.log(result2.outBinds.result2);

    if(result.outBinds.result===1 && result2.outBinds.result2 === 1 && bal >= amount){
        const resultUpdate = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :email`,
            {
                amount: amount,
                email: email
            }
        );

        


        const resultUpdate2 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE - (:amount+ :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );

        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );


        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="send money";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${email}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}', '${charge}', '${charge}')`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
    }
    else if(result.outBinds.result===1 && result3.outBinds.result3 === 1 && bal >= amount){
        const result = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :email`,
            {
                amount: amount,
                email: email
            }
        );


        const resultUpdate2 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE - (:amount+ :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );


        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="send money";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${email}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}', '${charge}' )`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
    }

    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});




app.post('/sendmoney_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const email = req.body.email;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    console.log(req.body);


    const result = await con.execute(
        `BEGIN :result := validity_email_payment(:youremail, :password); END;`,
        {
            result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    const result2 = await con.execute(
        `BEGIN :result2 := validity_email_agent2(:email); END;`,
        {
            result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            email: email,
        }
    );


    const result3 = await con.execute(
        `BEGIN :result3 := validity_user(:email); END;`,
        {
            result3: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            email: email,
        }
    );


    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_payment(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );
    

    const charge = 5;
    let num = 0;
    const bal = your_result2.outBinds.your_result2 - charge;


    console.log(result.outBinds.result);
    console.log(result2.outBinds.result2);

    if(result.outBinds.result===1 && result2.outBinds.result2 === 1 && bal >= amount){
        const resultUpdate = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :email`,
            {
                amount: amount,
                email: email
            }
        );


        const resultUpdate2 = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE - (:amount + :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );

        const admin = "dulalhossain71579@gmail.com"

        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="send money";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${email}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}', '${charge}')`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
    }
    else if(result.outBinds.result===1 && result3.outBinds.result3 === 1 && bal >= amount){
        const result = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :email`,
            {
                amount: amount,
                email: email
            }
        );


        const resultUpdate2 = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );

        const admin = "dulalhossain71579@gmail.com"

        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="send money";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${email}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}', '${charge}')`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
    }

    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});




app.post('/sendmoney_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const email = req.body.email;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    console.log(req.body);


    const result = await con.execute(
        `BEGIN :result := validity_email_shopping(:youremail, :password); END;`,
        {
            result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    const result2 = await con.execute(
        `BEGIN :result2 := validity_email_agent2(:email); END;`,
        {
            result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            email: email,
        }
    );


    const result3 = await con.execute(
        `BEGIN :result3 := validity_user(:email); END;`,
        {
            result3: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            email: email,
        }
    );


    

    let num = 0;

    console.log(result.outBinds.result);
    console.log(result2.outBinds.result2);

    if(result.outBinds.result===1 && result2.outBinds.result2 === 1){
        const resultUpdate = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :email`,
            {
                amount: amount,
                email: email
            }
        );


        const resultUpdate2 = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="send money";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${email}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}' )`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
    }
    else if(result.outBinds.result===1 && result3.outBinds.result3 === 1){
        const result = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :email`,
            {
                amount: amount,
                email: email
            }
        );


        const resultUpdate2 = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="send money";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${email}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}' )`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
    }

    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});


app.post('/cashout_agent', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const agentemail = req.body.agentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;

    console.log(req.body);

    const agent_result = await con.execute(
        `BEGIN :agent_result := validity_email_agent2(:agentemail); END;`,
        {
            agent_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           agentemail: agentemail,
        }
    );

    console.log(agent_result);


    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_agent(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    let num = 0;

    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_agent(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );


   



    const charge1 = (7/1000) * amount;
    const charge2 = (3/1000) * amount;
    const bal = your_result2.outBinds.your_result2 - charge1 - charge2;

    console.log(agent_result.outBinds.agent_result);
    console.log(your_result.outBinds.your_result);
    if (agent_result.outBinds.agent_result === 1 && bal >= amount) {
        if(your_result.outBinds.your_result === 1){
            const charge = charge1 + charge2;
        const resultUpdate = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + (:amount+ :charge2) WHERE EMAIL = :agentemail`,
            {
                amount: amount,
                agentemail: agentemail,
                charge2:charge2
            }
        );
        console.log('agent')
        const resultUpdate2 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE - (:amount + :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );

        const admin = "dulalhossain71579@gmail.com";
        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge1 WHERE EMAIL = :admin`,
            {
                charge1: charge1,
                admin: admin
            }
        );
        
        console.log(youremail);
        console.log(reference);

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="cash out";
        
        console.log(charge)
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${agentemail}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}', '${charge}' )`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
        }
    }

    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/cashout_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const agentemail = req.body.agentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;

    console.log(req.body);

    const agent_result = await con.execute(
        `BEGIN :agent_result := validity_email_agent2(:agentemail); END;`,
        {
            agent_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            agentemail: agentemail,
        }
    );

    console.log(agent_result);


    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_payment(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_payment(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );

    const charge1 = (7/1000) * amount;
    const charge2 = (3/1000) * amount;
    const charge = charge1 + charge2;

    let num = 0;

    console.log(agent_result.outBinds.agent_result);
    console.log(your_result.outBinds.your_result);

    const bal = your_result2.outBinds.your_result2 - charge;

    if (agent_result.outBinds.agent_result === 1 && bal >= amount) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :agentemail`,
            {
                amount: amount,
                agentemail: agentemail
            }
        );
        console.log('agent')
        const resultUpdate2 = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE - (:amount+ :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );

        const admin = "dulalhossain71579@gmail.com"

        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge1 WHERE EMAIL = :admin`,
            {
                charge1: charge1,
                admin: admin
            }
        );
        
        console.log(youremail)
        console.log(reference);

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="cash out";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${agentemail}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}' )`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/cashout_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const agentemail = req.body.agentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;

    console.log(req.body);

    const agent_result = await con.execute(
        `BEGIN :agent_result := validity_email_agent2(:agentemail); END;`,
        {
            agent_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            agentemail: agentemail,
        }
    );

    console.log(agent_result);


    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_shopping(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    let num = 0;

    console.log(agent_result.outBinds.agent_result);
    console.log(your_result.outBinds.your_result);

    if (agent_result.outBinds.agent_result === 1) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :agentemail`,
            {
                amount: amount,
                agentemail: agentemail
            }
        );
        console.log('agent')
        const resultUpdate2 = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log(youremail)
        console.log(reference);

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="cash out";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${agentemail}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}' )`;
        const history2 = await con.execute(history);

        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/cashin', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const recieveremail = req.body.recieveremail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;

    console.log(req.body);

    const reciever_result = await con.execute(
        `BEGIN :reciever_result := validity_user(:recieveremail); END;`,
        {
            reciever_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            recieveremail: recieveremail
        }
    );

    console.log(reciever_result);


    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_agent(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    let num = 0;

    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_agent(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );

    const bal = your_result2.outBinds.your_result2;


    const charge = (2/1000) * amount;



    const admin = "dulalhossain71579@gmail.com";

    console.log(reciever_result.outBinds.reciever_result);
    console.log(your_result.outBinds.your_result);



    if (reciever_result.outBinds.reciever_result === 1 && bal>amount) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :recieveremail`,
            {
                amount: amount,
                recieveremail: recieveremail
            }
        );

        console.log('agent')
        const resultUpdate4 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :youremail`,
            {
                youremail: youremail,
                charge:charge
            }
        );

        const resultUpdate5 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE - :charge WHERE EMAIL = :admin`,
            {
                admin:admin,
                charge:charge
            }
        );

        const resultUpdate2 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log('yourmail')
        console.log(reference);


        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="cashin";

        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${recieveremail}', '${amount}', '${reference}', '${cash}', SYSDATE, '${x}', '${charge}')`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/cashin_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const recieveremail = req.body.recieveremail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;

    console.log(req.body);

    const reciever_result = await con.execute(
        `BEGIN :reciever_result := validity_user(:recieveremail); END;`,
        {
            reciever_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            recieveremail: recieveremail
        }
    );

    console.log(reciever_result);


    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_payment(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    let num = 0;

    console.log(reciever_result.outBinds.reciever_result);
    console.log(your_result.outBinds.your_result);

    console.log(your_result.outBinds.your_result);
    console.log(your_result.outBinds.your_result);

    if (reciever_result.outBinds.reciever_result === 1) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :recieveremail`,
            {
                amount: amount,
                recieveremail: recieveremail
            }
        );
        console.log('agent')
        const resultUpdate2 = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log('yourmail')
        console.log(reference);


        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="cashin";
        const charge = 0;
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${recieveremail}', '${amount}', '${reference}', '${cash}', SYSDATE, '${x}', '${charge}')`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/cashin_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const recieveremail = req.body.recieveremail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;

    console.log(req.body);

    const reciever_result = await con.execute(
        `BEGIN :reciever_result := validity_user(:recieveremail); END;`,
        {
            reciever_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            recieveremail: recieveremail
        }
    );

    console.log(reciever_result);


    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_shopping(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password:password
        }
    );

    let num = 0;

    console.log(reciever_result.outBinds.reciever_result);
    console.log(your_result.outBinds.your_result);

    console.log(your_result.outBinds.your_result);
    console.log(your_result.outBinds.your_result);

    if (reciever_result.outBinds.reciever_result === 1) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :recieveremail`,
            {
                amount: amount,
                recieveremail: recieveremail
            }
        );
        console.log('agent')
        const resultUpdate2 = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log('yourmail')
        console.log(reference);


        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="cashin";

        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${recieveremail}', '${amount}', '${reference}', '${cash}', SYSDATE, '${x}')`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/signup_payment', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const username = req.body.name;
    const email    = req.body.email;
    const password = req.body.password;
    const code = req.body.code;
    const account = req.body.account_type;


    const mailOptions = {
        from: 'omlan2793@gmail.com', // your email
        to: email,
        subject: 'Welcome to Our Platform',
        text: `Dear ${username}, Welcome to our platform. Your verification code is ${code}.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Email sending failed');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });

    console.log(req.body);


    const command = `INSERT INTO CODE VALUES('${code}', '${email}')`;
    
    await con.execute(command);

    con.commit();
    res.send({})
})



app.post('/signup_shopping', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const username = req.body.name;
    const email    = req.body.email;
    const password = req.body.password;
    const code = req.body.code;
    const account = req.body.account_type;


    const mailOptions = {
        from: 'omlan2793@gmail.com', // your email
        to: email,
        subject: 'Welcome to Our Platform',
        text: `Dear ${username}, Welcome to our platform. Your verification code is ${code}.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Email sending failed');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });

    console.log(req.body);


    const command = `INSERT INTO CODE VALUES('${code}', '${email}')`;
    
    await con.execute(command);

    con.commit();
    res.send({})
})



app.post('/usersendmail', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const username = req.body.username;
    const useremail    = req.body.useremail;
    const userpassword = req.body.userpassword;
    const code = req.body.code;


    const mailOptions = {
        from: 'omlan2793@gmail.com',
        to: useremail,
        subject: 'Welcome to Our Platform',
        text: `Dear ${username}, Welcome to our platform. Your verification code is ${code}.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Email sending failed');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });

    console.log(req.body);


    const command = `INSERT INTO CODE VALUES('${code}', '${useremail}')`;
    
    await con.execute(command);

    con.commit();
    res.send({})
})



app.post('/agentsendmail', async(req, res) => {

    const con = await oracledb.getConnection(config);

    const agentname = req.body.agentname;
    const agentemail    = req.body.agentemail;
    const agentpassword = req.body.agentpassword;
    const code = req.body.code;


    const mailOptions = {
        from: 'omlan2793@gmail.com',
        to: agentemail,
        subject: 'Welcome to Our Platform',
        text: `Dear ${agentname}, Welcome to our platform. Your verification code is ${code}.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Email sending failed');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });

    console.log(req.body);


    const command = `INSERT INTO CODE VALUES('${code}', '${agentemail}')`;
    
    await con.execute(command);

    con.commit();
    res.send({})
})


app.post('/userverify', async (req, res) => {
    console.log("user verify");
    console.log(req.body);

    const useremail = req.body.useremail;
    console.log(useremail);

    const con = await oracledb.getConnection(config);

    const command = `SELECT CODE FROM CODE WHERE EMAIL='${useremail}'`;

    const result = await con.execute(command);

    console.log(result.rows); 

    let isCodeValid = false;

    if (result.rows.length > 0) {
        const storedCode = result.rows[0][0]; // Access the code from the first row
        if (req.body.code === storedCode) {
            isCodeValid = true;
        }
        console.log(storedCode);
    }

    console.log(isCodeValid);
    res.send(isCodeValid);
});



app.post('/userremovecode', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("remove code");

    const username = req.body.agentname;
    const email    = req.body.agentemail;
    const password = req.body.agentpassword;
  
    console.log(req.body);
    

 
 
    const command1 = `DELETE CODE`;

    await con.execute(command1)
    con.commit(); 

    res.send("ok")
})



app.post('/userinsert', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("insert")


    const username = req.body.username;
    const useremail    = req.body.useremail;
    const userpassword = req.body.userpassword;
    console.log(req.body);   

 

    const command = "INSERT INTO USER_INFO VALUES('" + username + "','" + useremail + "','" + userpassword + "','" + 0 + "')";

    await con.execute(command)
    con.commit();

    res.send("ok")
})


app.post('/agentinsert', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("insert")


    const agentname = req.body.agentname;
    const agentemail    = req.body.agentemail;
    const agentpassword = req.body.agentpassword;
    console.log(req.body);   

 

    const command = "INSERT INTO AGENT_INFO VALUES('" + agentname + "','" + agentemail + "','" + agentpassword + "','" + 0 + "')";

    await con.execute(command)
    con.commit();

    res.send("ok")
})



app.post('/payment_insert', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("insert")


    const agentname = req.body.agentname;
    const agentemail    = req.body.agentemail;
    const agentpassword = req.body.agentpassword;
    const account_type = req.body.account_type;
    console.log(req.body);   

 

    const command = "INSERT INTO PAYMENT VALUES('" + agentname + "','" + agentemail + "','" + agentpassword + "','" + 0 + "','" + account_type + "')";

    await con.execute(command)
    con.commit();

    res.send("ok")
})



app.post('/shopping_insert', async(req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("insert")


    const agentname = req.body.agentname;
    const agentemail    = req.body.agentemail;
    const agentpassword = req.body.agentpassword;
    const account_type = req.body.account_type;
    console.log(req.body);   

 

    const command = "INSERT INTO SHOPPING VALUES('" + agentname + "','" + agentemail + "','" + agentpassword + "','" + 0 + "','" + account_type + "')";

    await con.execute(command)
    con.commit();

    res.send("ok")
})


app.post('/balance_check_user', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("balance check");

    const useremail = req.body.useremail;

    console.log(req.body);   

    const command = `SELECT BALANCE FROM USER_INFO WHERE EMAIL = '${useremail}'`;

    const result = await con.execute(command);

    console.log(result.rows); 

    let num = 0;
    let storedCode; // Declaring storedCode outside the if block

    if (result.rows.length > 0) {
        storedCode = result.rows[0][0]; // Access the code from the first row
        console.log(storedCode);
    }

    await con.close();
    num = storedCode;
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/balance_check_agent', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("balance check");

    const agentemail = req.body.email;

    console.log(req.body);   

    const command = `SELECT BALANCE FROM AGENT_INFO WHERE EMAIL = '${agentemail}'`;

    const result = await con.execute(command);

    console.log(result.rows); 

    let num = 0;
    let storedCode; // Declaring storedCode outside the if block

    if (result.rows.length > 0) {
        storedCode = result.rows[0][0]; // Access the code from the first row
        console.log(storedCode);
    }

    await con.close();
    num = storedCode;
    console.log(num);

    res.status(200).json({ num: num });
});





app.post('/balance_check_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("balance check");

    const agentemail = req.body.email;

    console.log(req.body);   

    const command = `SELECT BALANCE FROM PAYMENT WHERE EMAIL = '${agentemail}'`;

    const result = await con.execute(command);

    console.log(result.rows); 

    let num = 0;
    let storedCode; // Declaring storedCode outside the if block

    if (result.rows.length > 0) {
        storedCode = result.rows[0][0]; // Access the code from the first row
        console.log(storedCode);
    }

    await con.close();
    num = storedCode;
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/balance_check_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("balance check");

    const agentemail = req.body.email;

    console.log(req.body);   

    const command = `SELECT BALANCE FROM SHOPPING WHERE EMAIL = '${agentemail}'`;

    const result = await con.execute(command);

    console.log(result.rows); 

    let num = 0;
    let storedCode; // Declaring storedCode outside the if block

    if (result.rows.length > 0) {
        storedCode = result.rows[0][0]; // Access the code from the first row
        console.log(storedCode);
    }

    await con.close();
    num = storedCode;
    console.log(num);

    res.status(200).json({ num: num });
});




app.post('/sendmoney_user', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.useremail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
   
    const charge = 5;

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_user(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail,
        }
    );

    console.log(user_result);


    const your_result = await con.execute(
        `BEGIN :your_result := validity(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );


    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_user(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );



    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    console.log(your_result2.outBinds.your_result2)
    const bal = your_result2.outBinds.your_result2 - 5;

    if (user_result.outBinds.user_result === 1 && bal >= amount) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')
        const resultUpdate2 = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE - (:amount+5) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );

        const admin = "dulalhossain71579@gmail.com"

        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );


        
        console.log(youremail)
        console.log(reference);

        let x = Math.floor((Math.random() * 9999999) + 1);
        x = x%1000000;
        if(x < 1000000) x += 1000000;
        const cash="send money";
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE, '${x}', '${charge}' )`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    else{
        console.log("Insufficient fund");
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});




app.post('/paybill_user', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paybillemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;

    let cash = type + " paybill"

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_paybill(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail
        }
    );

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_user(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );

    const charge = (10/1000) * amount;
    const bal = your_result2.outBinds.your_result2 - charge;

    const admin = "dulalhossain71579@gmail.com"

    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    if (user_result.outBinds.user_result === 1 && bal >= amount) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')
        const resultUpdate2 = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE - (:amount+ :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );


        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );

        
        console.log(youremail)
        console.log(reference);
        console.log(x);
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , '${x}', '${charge}')`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/paybill_agent', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paybillemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;

    let cash = type + " paybill"

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_paybill(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail
        }
    );

    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_agent(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );

    const charge1 = (7/1000) * amount;
    const charge2 = (3/1000) * amount;
    const charge = charge1 + charge2;

    const bal = your_result2.outBinds.your_result2 - charge;

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_agent(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    if (user_result.outBinds.user_result === 1 && bal >= amount) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE + (:amount + :charge2) WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail,
                charge2:charge2
            }
        );
        console.log('user')

        const resultUpdate2 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE - (:amount + :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );


        const admin = "dulalhossain71579@gmail.com";
        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge1 WHERE EMAIL = :admin`,
            {
                charge1: charge1,
                admin: admin
            }
        );
        
        console.log(youremail)
        console.log(reference);
        console.log(x);
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , ${x} , '${charge}')`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/paybill_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paybillemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;

    let cash = type + " paybill"

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_paybill(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail
        }
    );

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_payment(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    if (user_result.outBinds.user_result === 1) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')

        const resultUpdate2 = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log(youremail)
        console.log(reference);
        console.log(x);
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , ${x})`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/paybill_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paybillemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;

    let cash = type + " paybill"

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_paybill(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            useremail: useremail
        }
    );

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_shopping(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    if (user_result.outBinds.user_result === 1) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')

        const resultUpdate2 = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log(youremail)
        console.log(reference);
        console.log(x);
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , ${x})`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});


app.post('/payment_user', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paymentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;
    console.log(useremail);
    console.log(password);
    console.log(amount);
    console.log(youremail);
    console.log(reference);


    let cash = type + " payment"

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_shopping(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail
        }
    );

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    let num = 0;

    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_user(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );

    const charge = (10/1000) * amount;
    const bal = your_result2.outBinds.your_result2 - charge;


    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);
    if (user_result.outBinds.user_result === 1 && bal >= amount) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')
        const resultUpdate2 = await con.execute(
            `UPDATE USER_INFO SET BALANCE = BALANCE - (:amount+ :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );


        const admin = "dulalhossain71579@gmail.com";
        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );
        
        console.log(youremail);
        console.log(reference);
        console.log(x);
        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , '${x}', '${charge}')`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});




app.post('/payment_agent', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paymentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;



    let cash = type + " payment";

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_payment(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail
        }
    );



    const your_result2 = await con.execute(
        `BEGIN :your_result2 := validity_amount_agent(:youremail); END;`,
        {
            your_result2: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail
        }
    );

    

    const charge = (10/1000) * amount;
    const bal = your_result2.outBinds.your_result2 - charge;

    

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_agent(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    if (user_result.outBinds.user_result === 1 && bal >= amount) {
        if(your_result.outBinds.your_result === 1){

            const admin = "dulalhossain71579@gmail.com"
            const resultUpdate = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')
        const resultUpdate2 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE - (:amount + :charge) WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail,
                charge:charge
            }
        );



        const resultUpdate3 = await con.execute(
            `UPDATE AGENT_INFO SET BALANCE = BALANCE + :charge WHERE EMAIL = :admin`,
            {
                charge: charge,
                admin: admin
            }
        );
        
        console.log(youremail);
        console.log(reference);
        console.log(x);

        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , ${x}, '${charge}')`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/payment_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paymentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;



    let cash = type + " payment";

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_payment(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail
        }
    );

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_payment(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    if (user_result.outBinds.user_result === 1) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')
        const resultUpdate2 = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log(youremail);
        console.log(reference);
        console.log(x);

        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , ${x})`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/payment_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paymentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;



    let cash = type + " payment";

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_payment(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail
        }
    );

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_shopping(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    if (user_result.outBinds.user_result === 1) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')
        const resultUpdate2 = await con.execute(
            `UPDATE PAYMENT SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log(youremail);
        console.log(reference);
        console.log(x);

        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , ${x})`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/shopping_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);

    const useremail = req.body.paymentemail;
    const password = req.body.password;
    const amount = req.body.amount;
    const youremail = req.body.youremail;
    const reference = req.body.reference;
    const type = req.body.type;



    let cash = type + " payment";

    console.log(req.body);

    const user_result = await con.execute(
        `BEGIN :user_result := validity_shopping(:useremail); END;`,
        {
            user_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
           useremail: useremail
        }
    );

    console.log(user_result);

    console.log(cash)

    let x = Math.floor((Math.random() * 9999999) + 1);
    x = x%1000000;
    if(x < 1000000) x += 1000000;

    console.log(x)

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_shopping(:youremail, :password); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            password: password
        }
    );

    let num = 0;

    console.log(user_result.outBinds.user_result);
    console.log(your_result.outBinds.your_result);

    if (user_result.outBinds.user_result === 1) {
        if(your_result.outBinds.your_result === 1){
        const resultUpdate = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE + :amount WHERE EMAIL = :useremail`,
            {
                amount: amount,
                useremail: useremail
            }
        );
        console.log('user')
        const resultUpdate2 = await con.execute(
            `UPDATE SHOPPING SET BALANCE = BALANCE - :amount WHERE EMAIL = :youremail`,
            {
                amount: amount,
                youremail: youremail
            }
        );
        
        console.log(youremail);
        console.log(reference);
        console.log(x);

        const history = `INSERT INTO HISTORY VALUES('${youremail}', '${useremail}', '${amount}', '${reference}','${cash}', SYSDATE , ${x})`;
        const history2 = await con.execute(history);
        console.log("OK");
        await con.commit();
        num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/history_user', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("history check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT SENDER_EMAIL, RECIEVER_EMAIL, AMOUNT, REFERENCE, TRANSACTION, DTYPE, TO_CHAR(TIME, 'DD-MM-YYYY HH:MM:SS AM') TIME, CHARGE FROM HISTORY WHERE SENDER_EMAIL = '${useremail}' OR RECIEVER_EMAIL = '${useremail}' ORDER BY TIME DESC`;

    const result = await con.execute(command);

    console.log(result); 

    // Send only the rows back, not the entire result object
    res.status(200).json(result.rows);
});


app.post('/history_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("history check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT SENDER_EMAIL, RECIEVER_EMAIL, AMOUNT, REFERENCE, TRANSACTION, DTYPE, TIME FROM HISTORY WHERE SENDER_EMAIL = '${useremail}' OR RECIEVER_EMAIL = '${useremail}'`;

    const result = await con.execute(command);

    console.log(result); 

    // Send only the rows back, not the entire result object
    res.status(200).json(result.rows);
});


app.post('/rank_user', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("rank check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT B1.EMAIL,  COUNT(*) RANK
                     FROM USER_INFO B1 JOIN USER_INFO B2 ON (B1.BALANCE < B2.BALANCE)
                     GROUP BY B1.EMAIL
                     ORDER BY RANK ASC`;

    const result = await con.execute(command);

    console.log(result); 

    // Send only the rows back, not the entire result object
    res.status(200).json(result.rows);
});



app.post('/rank_agent', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("rank check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT B1.EMAIL,  COUNT(*) RANK
                     FROM AGENT_INFO B1 JOIN AGENT_INFO B2 ON (B1.BALANCE < B2.BALANCE)
                     GROUP BY B1.EMAIL
                     ORDER BY RANK ASC`;

    const result = await con.execute(command);

    console.log(result); 

    // Send only the rows back, not the entire result object
    res.status(200).json(result.rows);
});



app.post('/rank_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("rank check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT B1.EMAIL,  COUNT(*) RANK
                     FROM PAYMENT B1 JOIN PAYMENT B2 ON (B1.BALANCE < B2.BALANCE)
                     GROUP BY B1.EMAIL
                     ORDER BY RANK ASC`;

    const result = await con.execute(command);

    console.log(result); 

    res.status(200).json(result.rows);
});


app.post('/rank_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("rank check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT B1.EMAIL,  COUNT(*) RANK
                     FROM SHOPPING B1 JOIN SHOPPING B2 ON (B1.BALANCE < B2.BALANCE)
                     GROUP BY B1.EMAIL
                     ORDER BY RANK ASC`;

    const result = await con.execute(command);

    console.log(result); 

    res.status(200).json(result.rows);
});


app.post('/history_agent', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("history check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT SENDER_EMAIL, RECIEVER_EMAIL, AMOUNT, REFERENCE, TRANSACTION, DTYPE, TO_CHAR(TIME, 'DD-MM-YYYY HH:MM:SS AM') TIME, CHARGE FROM HISTORY WHERE SENDER_EMAIL = '${useremail}' OR RECIEVER_EMAIL = '${useremail}' ORDER BY TIME DESC`;

    const result = await con.execute(command);

    console.log(result); 

    // Send only the rows back, not the entire result object
    res.status(200).json(result.rows);
});



app.post('/history_payment', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("history check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT SENDER_EMAIL, RECIEVER_EMAIL, AMOUNT, REFERENCE, TRANSACTION, DTYPE, TIME FROM HISTORY WHERE SENDER_EMAIL = '${useremail}' OR RECIEVER_EMAIL = '${useremail}'`;

    const result = await con.execute(command);

    console.log(result); 

    // Send only the rows back, not the entire result object
    res.status(200).json(result.rows);
});



app.post('/history_shopping', async (req, res) => {
    const con = await oracledb.getConnection(config);
    
    console.log("history check");

    const useremail = req.body.youremail;

    console.log(req.body);   

    const command = `SELECT SENDER_EMAIL, RECIEVER_EMAIL, AMOUNT, REFERENCE, TRANSACTION, DTYPE, TIME FROM HISTORY WHERE SENDER_EMAIL = '${useremail}' OR RECIEVER_EMAIL = '${useremail}'`;

    const result = await con.execute(command);

    console.log(result); 

    // Send only the rows back, not the entire result object
    res.status(200).json(result.rows);
});


app.post('/editprofile', async (req, res) => {
    let num = 0; // Initialize num
    const con = await oracledb.getConnection(config);

    const username = req.body.username;
    const currentpassword = req.body.currentpassword;
    const youremail = req.body.youremail;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;

    console.log(req.body)
    

    const your_result = await con.execute(
        `BEGIN :your_result := validity(:youremail, :currentpassword); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            currentpassword: currentpassword
        }
    );

    console.log(your_result.outBinds.your_result);
    if(newpassword === confirmpassword){
        if(your_result.outBinds.your_result === 1){
            const command2 = `UPDATE USER_INFO SET PASSWORD = '${newpassword}' WHERE EMAIL = '${youremail}'`;
            const name2 = await con.execute(command2);
            console.log('user');
            console.log(youremail);
            console.log("OK");
            const command = `UPDATE USER_INFO SET NAME = '${username}' WHERE EMAIL = '${youremail}'`;
    
            const name = await con.execute(command);
            await con.commit();
            num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/editprofile_agent', async (req, res) => {
    let num = 0; // Initialize num
    const con = await oracledb.getConnection(config);

    const agentname = req.body.agentname;
    const agentcurrentpassword = req.body.agentcurrentpassword;
    const youremail = req.body.youremail;
    const agentnewpassword = req.body.agentnewpassword;
    const agentconfirmpassword = req.body.agentconfirmpassword;

    console.log(req.body)
    

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_agent(:youremail, :agentcurrentpassword); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            agentcurrentpassword: agentcurrentpassword
        }
    );

    console.log(your_result.outBinds.your_result);
    if(agentnewpassword === agentconfirmpassword){
        if(your_result.outBinds.your_result === 1){
            const command2 = `UPDATE AGENT_INFO SET PASSWORD = '${agentnewpassword}' WHERE EMAIL = '${youremail}'`;
            const name2 = await con.execute(command2);
            console.log('agent');
            console.log(youremail);
            console.log("OK");
            const command = `UPDATE AGENT_INFO SET NAME = '${agentname}' WHERE EMAIL = '${youremail}'`;
    
            const name = await con.execute(command);
            console.log(name);
            console.log(name2);
            await con.commit();
            num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});



app.post('/editprofile_payment', async (req, res) => {
    let num = 0; // Initialize num
    const con = await oracledb.getConnection(config);

    const agentname = req.body.agentname;
    const agentcurrentpassword = req.body.agentcurrentpassword;
    const youremail = req.body.youremail;
    const agentnewpassword = req.body.agentnewpassword;
    const agentconfirmpassword = req.body.agentconfirmpassword;

    console.log(req.body)
    

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_payment(:youremail, :agentcurrentpassword); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            agentcurrentpassword: agentcurrentpassword
        }
    );

    console.log(your_result.outBinds.your_result);

    if(agentnewpassword === agentconfirmpassword){
        if(your_result.outBinds.your_result === 1){
            const command2 = `UPDATE PAYMENT SET PASSWORD = '${agentnewpassword}' WHERE EMAIL = '${youremail}'`;
            const name2 = await con.execute(command2);
            console.log('agent');
            console.log(youremail);
            console.log("OK");
            const command = `UPDATE PAYMENT SET NAME = '${agentname}' WHERE EMAIL = '${youremail}'`;
    
            const name = await con.execute(command);
            console.log(name);
            console.log(name2);
            await con.commit();
            num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});


app.post('/editprofile_shopping', async (req, res) => {
    let num = 0; // Initialize num
    const con = await oracledb.getConnection(config);

    const agentname = req.body.agentname;
    const agentcurrentpassword = req.body.agentcurrentpassword;
    const youremail = req.body.youremail;
    const agentnewpassword = req.body.agentnewpassword;
    const agentconfirmpassword = req.body.agentconfirmpassword;

    console.log(req.body)
    

    const your_result = await con.execute(
        `BEGIN :your_result := validity_email_shopping(:youremail, :agentcurrentpassword); END;`,
        {
            your_result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
            youremail: youremail,
            agentcurrentpassword: agentcurrentpassword
        }
    );

    console.log(your_result.outBinds.your_result);

    if(agentnewpassword === agentconfirmpassword){
        if(your_result.outBinds.your_result === 1){
            const command2 = `UPDATE SHOPPING SET PASSWORD = '${agentnewpassword}' WHERE EMAIL = '${youremail}'`;
            const name2 = await con.execute(command2);
            console.log('agent');
            console.log(youremail);
            console.log("OK");
            const command = `UPDATE SHOPPING SET NAME = '${agentname}' WHERE EMAIL = '${youremail}'`;
    
            const name = await con.execute(command);
            console.log(name);
            console.log(name2);
            await con.commit();
            num = 1;
        }
    }
    
    await con.close();
    console.log(num);

    res.status(200).json({ num: num });
});
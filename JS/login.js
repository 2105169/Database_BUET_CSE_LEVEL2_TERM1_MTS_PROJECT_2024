//let notifications = document.querySelector('.notifications');

const login = async () => {
    const firstName = document.getElementById("name").value
    const password = document.getElementById("password").value

    const user = {
        firstName: firstName,
        password: password,
    }

    const res = await fetch("http://localhost:4000/sign-up", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })
    
}
let code = 0;

function createToast(type, icon, title, text) {
    let newToast = document.createElement('div');
    newToast.innerHTML = `
        <div class="toast success">
            <i class="fa-solid fa-circle-check"></i>
            <div class="content">
                <div class="title">Success</div>
                <span>This is a success toast</span>
            </div>
            <i class="fa-solid fa-xmark"></i>
        </div>`;
        console.log("sdzesr", notifications)
        if(notifications) notifications.appendChild(newToast);
        // newToast.timeOut = setTimeout(
        //     () => newToast.remove(), 5000000
        // )
}

function showToast(text) {
    var message = text;
    
    // Create a new toast element
    var toast = document.createElement('div');
    toast.id = 'toast';
    toast.textContent = message;

    // Append the toast to the body
    document.body.appendChild(toast);

    // Trigger reflow to enable transition
    void toast.offsetWidth;

    // Show the toast
    toast.style.opacity = 1;

    // Hide the toast after a certain duration (e.g., 3000 milliseconds or 3 seconds)
    setTimeout(function () {
        toast.style.opacity = 0;

        // Remove the toast from the DOM after fading out
        setTimeout(function () {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}

async function signup_agent(){

    console.log("sign up agent")

    console.log("hi")
    const agentname = document.getElementById("agentname").value
    const agentemail = document.getElementById("agentemail").value
    const agentpassword = document.getElementById("agentpassword").value
    const agentconfirmpassword = document.getElementById("agentconfirmpassword").value
    //const agentbalance = document.getElementById("agentbalance").value;

    localStorage.removeItem("agentemail");
    localStorage.setItem("agentname", agentname)
    localStorage.setItem("agentemail", agentemail);
    localStorage.setItem("agentpassword", agentpassword);
    //localStorage.setItem("agentbalance", agentbalance);
    


    if((agentname === "") || (agentemail === "") || (agentpassword === "") || (agentconfirmpassword === "")) {
        alert("No field should be empty.Try Again")
        return;
    }

    if (agentconfirmpassword !== agentpassword) {
        showToast("Passwords Didn't Match.Try Again");
        const error = document.getElementById("error-msg")
        //error.innerHTML = "<p>invaid</p>"
        return;
    }

    

        console.log("hello")
        
        code = Math.floor((Math.random()*1000000)+1);

        const newUser = {
            agentname: agentname,
            agentemail: agentemail,
            agentpassword: agentpassword,
            code: code
        }


        const res = await fetch("http://localhost:4000/agentsendmail", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        
        window.location.href = "../html/signup_agentcode.html";
        
}


async function signup_user() {

    console.log("sign up user")
     

    console.log("hi")
    const username = document.getElementById("username").value
    const useremail = document.getElementById("useremail").value
    const userpassword = document.getElementById("userpassword").value
    const userconfirmpassword = document.getElementById("userconfirmpassword").value


    localStorage.removeItem("useremail");
    localStorage.setItem("useremail", useremail);

    
    

    localStorage.removeItem("userename");
    localStorage.setItem("username", username);


    if((username === "") || (useremail === "") || (userpassword === "") || (userconfirmpassword === "")) {
        alert("No field should be empty.Try Again")
        return;
    }

    if (userconfirmpassword !== userpassword) {
        showToast("Passwords Didn't Match.Try Again");
        const error = document.getElementById("error-msg")
        error.innerHTML = "<p>invaid</p>"
        return;
    }

    

        console.log("hello")
        
        code = Math.floor((Math.random()*1000000)+1);

        const newUser = {
            username: username,
            useremail: useremail,
            userpassword: userpassword,
            code: code
        }


        const res = await fetch("http://localhost:4000/usersendmail", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        
        window.location.href = "../html/signup_usercode.html";
        
}


 async function check_code() {
    console.log("check code")
    const fname = localStorage.getItem("username")
    const email = localStorage.getItem("email")
    const password = localStorage.getItem("password")
    const account_type = localStorage.getItem("account_type");
    console.log(account_type);

    const code1 = document.getElementById("verification-code").value
    console.log("this is code"+code, code1)

    const newUser = {
        name: fname,
        email,
        password,
        account_type:account_type
    }

    
    const userCode = {
        email:email,
        code:code1
    }

    console.log(localStorage.getItem("email"))
   
    const res = await fetch("http://localhost:4000/verify", {
        method: "POST",
        body: JSON.stringify(userCode),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    console.log(response)

    await fetch("http://localhost:4000/remove-code", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if(response === true) {
        // showToast('Login successful!');
        
        showToast('Sign Up successful!');
        
        await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.href = "http://127.0.0.1:5501/html/dashboard_agent.html";
    }
    else {
        showToast("Code Didn't Match.Try Again");
        return;
    }
}



async function check_code_payment() {
    console.log("check code")
    const fname = localStorage.getItem("username")
    const email = localStorage.getItem("email")
    const password = localStorage.getItem("password")
    const account_type = localStorage.getItem("account_type");
    console.log(account_type);

    const code1 = document.getElementById("verification-code").value
    console.log("this is code"+code, code1)

    const newUser = {
        name: fname,
        email,
        password,
        account_type:account_type
    }

    
    const userCode = {
        email:email,
        code:code1
    }

    console.log(localStorage.getItem("email"))
   
    const res = await fetch("http://localhost:4000/verify", {
        method: "POST",
        body: JSON.stringify(userCode),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    console.log(response)

    await fetch("http://localhost:4000/remove-code", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if(response === true) {
        // showToast('Login successful!');
        
        showToast('Sign Up successful!');
        
        await fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.href = "http://127.0.0.1:5501/html/dashboard_agent.html";
    }
    else {
        showToast("Code Didn't Match.Try Again");
        return;
    }
}




async function signin() {
 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
   

    const user = {
        email:email,
        password:password
    };

    console.log(user)
    const res = await fetch("http://localhost:4000/login-search", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    console.log("signin")

    const response = await res.json();
    console.log(response);
     



    if (response === 1) {
        showToast("Login Successful!");
        console.log("Dulal");
        console.log(localStorage.getItem("useremail"))
       localStorage.removeItem("useremail")
        localStorage.setItem("useremail", email);
        console.log(localStorage.getItem("useremail"))
        
        window.location.href = "http://127.0.0.1:5501/html/dashboard.html";
      
    } else if (response === 0) {
        showToast("Invalid Email and Password");
    } else {
        showToast("Email is not registered");
    } 
}





async function signin_agent() {
 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    localStorage.removeItem("agentemail");
    localStorage.setItem("agentemail", email);
   

    const user = {
        email:email,
        password:password
    };

    console.log(user)
    const res = await fetch("http://localhost:4000/login_agent", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    console.log("signin")

    const response = await res.json();
    console.log(response);
     



    if (response === 1) {
        showToast("Login Successful!");
        window.location.href = "http://127.0.0.1:5501/html/dashboard_agent.html";
      
    } else if (response === 0) {
        showToast("Invalid Email and Password");
    } else {
        showToast("Email is not registered");
    } 
}




async function signin_payment() {
 
    const email = document.getElementById("payment_email").value;
    const password = document.getElementById("password").value;
    localStorage.removeItem("email");
    localStorage.setItem("email", email);
   

    const user = {
        email:email,
        password:password
    };
    console.log(user)

    console.log(user)
    const res = await fetch("http://localhost:4000/login_payment", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    console.log("signin")

    const response = await res.json();
    console.log(response);
     



    if (response === 1) {
        showToast("Login Successful!");
        window.location.href = "http://127.0.0.1:5501/html/dashboard_payment.html";
      
    } else if (response === 0) {
        showToast("Invalid Email and Password");
    } else {
        showToast("Email is not registered");
    } 
}




async function signin_shopping() {
 
    const email = document.getElementById("payment_email").value;
    const password = document.getElementById("password").value;
    localStorage.removeItem("emailshopping");
    localStorage.setItem("emailshopping", email);
   

    const user = {
        email:email,
        password:password
    };
    console.log(user)

    console.log(user)
    const res = await fetch("http://localhost:4000/login_shopping", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    console.log("signin")

    const response = await res.json();
    console.log(response);
     



    if (response === 1) {
        showToast("Login Successful!");
        window.location.href = "http://127.0.0.1:5501/html/dashboard_shopping.html";
      
    } else if (response === 0) {
        showToast("Invalid Email and Password");
    } else {
        showToast("Email is not registered");
    } 
}





function account() {
    window.location.href = "../html/account-details.html";
}



function account_agent() {
    window.location.href = "../html/account_details_agent.html";
}


function account_payment() {
    window.location.href = "../html/account_details_payment.html";
}




async function delete_account() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const user = {
        email:email,
        curr_pass: password,
        password: password
    }

    const res = await fetch("http://localhost:4000/pass-check", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    if(response === true) {
        const res = await fetch("http://localhost:4000/delete", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })

        showToast("Account Deleted");
        window.location.href = "../html/pre-sign-up.html";
    }

    else {
        showToast("Invalid Email or Password");
    }
}



async function delete_account_agent() {
    const email = localStorage.getItem("agentemail");
    const current_pass = document.getElementById("password").value
    const new_pass = current_pass;
    const user = {
        email:email,
        current_pass: current_pass,
        new_pass:new_pass
    }

    console.log(user)
    const res = await fetch("http://localhost:4000/pass_check_agent", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    if(response === true) {
        const res = await fetch("http://localhost:4000/delete_agent", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })

        showToast("Account Deleted");
        localStorage.removeItem("agentemail");
        window.location.href = "../html/pre-sign-up.html";
    }

    else {
        showToast("Invalid Email or Password");
    }
}




async function delete_account_payment() {
    const email = localStorage.getItem("email");
    const current_pass = document.getElementById("password").value
    const new_pass = current_pass;
    const user = {
        email:email,
        current_pass: current_pass,
        new_pass:new_pass
    }

    console.log(user)
    const res = await fetch("http://localhost:4000/pass_check_payment", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    if(response === true) {
        const res = await fetch("http://localhost:4000/delete_payment", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })

        showToast("Account Deleted");
        localStorage.removeItem("agentemail");
        window.location.href = "../html/pre-sign-up.html";
    }

    else {
        showToast("Invalid Email or Password");
    }
}




async function delete_account_shopping() {
    const email = localStorage.getItem("emailshopping");
    const current_pass = document.getElementById("password").value
    const new_pass = current_pass;
    const user = {
        email:email,
        current_pass: current_pass,
        new_pass:new_pass
    }

    console.log(user)
    const res = await fetch("http://localhost:4000/pass_check_shopping", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    if(response) {
        const res = await fetch("http://localhost:4000/delete_shopping", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })

        showToast("Account Deleted");
        localStorage.removeItem("emailshopping");
        window.location.href = "../html/pre-sign-up.html";
    }

    else {
        showToast("Invalid Email or Password");
    }
}



async function sendmoney_agent() {  
    const email = document.getElementById("email_agent").value;
    const password = document.getElementById("password_agent").value;
    const youremail = localStorage.getItem("agentemail")
    const amount = document.getElementById("amount_agent").value;
    const reference = document.getElementById("reference_agent").value;
    
    const user = { 
        email: email,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    const res = await fetch("http://localhost:4000/sendmoney_agent", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_agent.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

   
}



async function sendmoney_payment() {  
    const email = document.getElementById("email_agent").value;
    const password = document.getElementById("password_agent").value;
    const youremail = localStorage.getItem("email")
    const amount = document.getElementById("amount_agent").value;
    const reference = document.getElementById("reference_agent").value;
    
    const user = { 
        email: email,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    const res = await fetch("http://localhost:4000/sendmoney_payment", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_payment.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

   
}



async function sendmoney_shopping() {  
    const email = document.getElementById("email_agent").value;
    const password = document.getElementById("password_agent").value;
    const youremail = localStorage.getItem("emailshopping")
    const amount = document.getElementById("amount_agent").value;
    const reference = document.getElementById("reference_agent").value;
    
    const user = { 
        email: email,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    const res = await fetch("http://localhost:4000/sendmoney_shopping", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_shopping.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

   
}



async function cashout() {  
    const agentemail = document.getElementById("agentmail").value;
    const password = document.getElementById("passwordcashout").value;
    const youremail = localStorage.getItem("useremail")
    const amount = document.getElementById("amount_cashout").value;
    const reference = document.getElementById("reference_cashout").value;
    
    const user = { 
        agentemail: agentemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    const res = await fetch("http://localhost:4000/cashout", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}




async function cashout_agent() {  
    const agentemail = document.getElementById("agent_email").value;
    const password = document.getElementById("password_cashout").value;
    const youremail = localStorage.getItem("agentemail");
    const amount = document.getElementById("amount_cashout").value;
    const reference = document.getElementById("reference_cashout").value;
    
    const user = { 
        agentemail: agentemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    const res = await fetch("http://localhost:4000/cashout_agent", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_agent.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function cashout_payment() {  
    const agentemail = document.getElementById("agent_email").value;
    const password = document.getElementById("password_cashout").value;
    const youremail = localStorage.getItem("email");
    const amount = document.getElementById("amount_cashout").value;
    const reference = document.getElementById("reference_cashout").value;
    
    const user = { 
        agentemail: agentemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    console.log(user);

    const res = await fetch("http://localhost:4000/cashout_payment", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_payment.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function cashout_shopping() {  
    const agentemail = document.getElementById("agent_email").value;
    const password = document.getElementById("password_cashout").value;
    const youremail = localStorage.getItem("emailshopping");
    const amount = document.getElementById("amount_cashout").value;
    const reference = document.getElementById("reference_cashout").value;
    
    const user = { 
        agentemail: agentemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    console.log(user);

    const res = await fetch("http://localhost:4000/cashout_shopping", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_shopping.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function cashin() {  
    const recieveremail = document.getElementById("recieveremail").value;
    const password = document.getElementById("password").value;
    const youremail = localStorage.getItem("agentemail");
    const amount = document.getElementById("amount").value;
    const reference = document.getElementById("reference").value;
    
    const user = { 
        recieveremail: recieveremail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    const res = await fetch("http://localhost:4000/cashin", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_agent.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

   
}




async function cashin_payment() {  
    const recieveremail = document.getElementById("recieveremail").value;
    const password = document.getElementById("password").value;
    const youremail = localStorage.getItem("email");
    const amount = document.getElementById("amount").value;
    const reference = document.getElementById("reference").value;
    
    const user = { 
        recieveremail: recieveremail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    console.log(user);

    const res = await fetch("http://localhost:4000/cashin_payment", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_payment.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

   
}



async function cashin_shopping() {  
    const recieveremail = document.getElementById("recieveremail").value;
    const password = document.getElementById("password").value;
    const youremail = localStorage.getItem("emailshopping");
    const amount = document.getElementById("amount").value;
    const reference = document.getElementById("reference").value;
    
    const user = { 
        recieveremail: recieveremail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    console.log(user);

    const res = await fetch("http://localhost:4000/cashin_shopping", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Login Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_shopping.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

   
}




async function signup_payment() {

    console.log("sign up")
    
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const selectElement = document.getElementById("account_type");
    const account_type = selectElement.value;
    const confirmPassword = document.getElementById("confirm_password").value
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(account_type);
    console.log(confirmPassword);
    


    if((name === "") || (email === "") || (password === "") || (confirmPassword === "")) {
        alert("No field should be empty.Try Again")
        return;
    }

    if (confirmPassword !== password) {
        showToast("Passwords Didn't Match.Try Again");
        const error = document.getElementById("error-msg")
        error.innerHTML = "<p>invaid</p>"
        return;
    }

    

        console.log("hello")
        
        code = Math.floor((Math.random()*1000000)+1);

        const newUser = {
            name: name,
            email: email,
            password: password,
            code: code,
            account_type:account_type
        }

        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("username");
        localStorage.removeItem("account_type");
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("username", name);
        localStorage.setItem("account_type", account_type);

        const res = await fetch("http://localhost:4000/signup_payment", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        
        window.location.href = "../html/signup_payment_check.html";
        
}




async function signup_shopping() {

    console.log("sign up")
    
    const name = document.getElementById("name").value
    const email = document.getElementById("emailshopping").value
    const password = document.getElementById("password").value
    const selectElement = document.getElementById("account_type");
    const account_type = selectElement.value;
    const confirmPassword = document.getElementById("confirm_password").value
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(account_type);
    console.log(confirmPassword);
    


    if((name === "") || (email === "") || (password === "") || (confirmPassword === "")) {
        alert("No field should be empty.Try Again")
        return;
    }

    if (confirmPassword !== password) {
        showToast("Passwords Didn't Match.Try Again");
        const error = document.getElementById("error-msg")
        error.innerHTML = "<p>invaid</p>"
        return;
    }

    

        console.log("hello")
        
        code = Math.floor((Math.random()*1000000)+1);

        const newUser = {
            name: name,
            email: email,
            password: password,
            code: code,
            account_type:account_type
        }

        localStorage.removeItem("emailshopping");
        localStorage.removeItem("password");
        localStorage.removeItem("username");
        localStorage.removeItem("account_type");
        localStorage.setItem("emailshopping", email);
        localStorage.setItem("password", password);
        localStorage.setItem("username", name);
        localStorage.setItem("account_type", account_type);

        const res = await fetch("http://localhost:4000/signup_shopping", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
        
        window.location.href = "../html/signup_shopping_check.html";
        
}




async function signup_usercheck() {
    console.log("check code")
    const username = localStorage.getItem("username")
    const useremail = localStorage.getItem("useremail")
    const userpassword = localStorage.getItem("userpassword")

    const code1 = document.getElementById("verification-code").value
  

    const newUser = {
        username: username,
        useremail:useremail,
        userpassword:userpassword
    }

    
    const userCode = {
        useremail:useremail,
        code:code1
    }

    console.log(useremail)
   
    const res = await fetch("http://localhost:4000/userverify", {
        method: "POST",
        body: JSON.stringify(userCode),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    console.log(response)

    await fetch("http://localhost:4000/userremovecode", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if(response === true) {
        
        showToast('Sign Up successful!');
        
        await fetch("http://localhost:4000/userinsert", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.href = "http://127.0.0.1:5501/html/dashboard.html";
    }
    else {
        showToast("Code Didn't Match.Try Again");
        return;
    }
}



async function signup_agentcheck() {
    console.log("check code")
    const agentname = localStorage.getItem("agentname")
    const agentemail = localStorage.getItem("agentemail")
    const agentpassword = localStorage.getItem("agentpassword")

    const code1 = document.getElementById("verification-code").value
  

    const newUser = {
        agentname: agentname,
        agentemail:agentemail,
        agentpassword:agentpassword
    }

    
    const userCode = {
        useremail:agentemail,
        code:code1
    }

    console.log(agentemail)
   
    const res = await fetch("http://localhost:4000/userverify", {
        method: "POST",
        body: JSON.stringify(userCode),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    console.log(response)

    await fetch("http://localhost:4000/userremovecode", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if(response === true) {
        
        showToast('Sign Up successful!');
        
        await fetch("http://localhost:4000/agentinsert", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.href = "http://127.0.0.1:5501/html/dashboard_agent.html";
    }
    else {
        showToast("Code Didn't Match.Try Again");
        return;
    }
}




async function signup_payment_check() {
    console.log("check code")
    const agentname = localStorage.getItem("username")
    const agentemail = localStorage.getItem("email")
    const agentpassword = localStorage.getItem("password")
    const account_type = localStorage.getItem("account_type");

    const code1 = document.getElementById("verification-code").value
  

    const newUser = {
        agentname: agentname,
        agentemail:agentemail,
        agentpassword:agentpassword,
        account_type:account_type
    }

    
    const userCode = {
        useremail:agentemail,
        code:code1
    }

    console.log(agentemail)
   
    const res = await fetch("http://localhost:4000/userverify", {
        method: "POST",
        body: JSON.stringify(userCode),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    console.log(response)

    await fetch("http://localhost:4000/userremovecode", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if(response === true) {
        
        showToast('Sign Up successful!');
        
        await fetch("http://localhost:4000/payment_insert", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.href = "http://127.0.0.1:5501/html/dashboard_payment.html";
    }
    else {
        showToast("Code Didn't Match.Try Again");
        return;
    }
}



async function signup_shopping_check() {
    console.log("check code")
    const agentname = localStorage.getItem("username")
    const agentemail = localStorage.getItem("emailshopping")
    const agentpassword = localStorage.getItem("password")
    const account_type = localStorage.getItem("account_type");

    const code1 = document.getElementById("verification-code").value
  

    const newUser = {
        agentname: agentname,
        agentemail:agentemail,
        agentpassword:agentpassword,
        account_type:account_type
    }

    
    const userCode = {
        useremail:agentemail,
        code:code1
    }

    console.log(agentemail)
   
    const res = await fetch("http://localhost:4000/userverify", {
        method: "POST",
        body: JSON.stringify(userCode),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();

    console.log(response)

    await fetch("http://localhost:4000/userremovecode", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    if(response === true) {
        
        showToast('Sign Up successful!');
        
        await fetch("http://localhost:4000/shopping_insert", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        window.location.href = "http://127.0.0.1:5501/html/dashboard_payment.html";
    }
    else {
        showToast("Code Didn't Match.Try Again");
        return;
    }
}




async function balance_check() {
    console.log("balance check")
   
    const useremail = localStorage.getItem("useremail")

  

    const newUser = {
        useremail:useremail 
       }

    console.log(useremail)
   
    const res = await fetch("http://localhost:4000/balance_check_user", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();
    console.log(response.num);
    document.getElementById("balance_check_result").innerText = " " + response.num;

}


async function balance_check_agent() {
    console.log("balance check")
   
    const email = localStorage.getItem("agentemail")

  

    const newUser = {
        email:email 
       }

    console.log(email)
   
    const res = await fetch("http://localhost:4000/balance_check_agent", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();
    console.log(response.num);
    document.getElementById("balance_check_result_agent").innerText = " " + response.num;

}


async function balance_check_payment() {
    console.log("balance check")
   
    const email = localStorage.getItem("email")

  

    const newUser = {
        email:email 
       }

    console.log(email)
   
    const res = await fetch("http://localhost:4000/balance_check_payment", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();
    console.log(response.num);
    document.getElementById("balance_check_result_agent").innerText = " " + response.num;

}



async function balance_check_shopping() {
    console.log("balance check")
   
    const email = localStorage.getItem("emailshopping")

  

    const newUser = {
        email:email 
       }

    console.log(email)
   
    const res = await fetch("http://localhost:4000/balance_check_shopping", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    })

    const response = await res.json();
    console.log(response.num);
    document.getElementById("balance_check_result_agent").innerText = " " + response.num;

}



function dashboard(){
    window.location.href = "http://127.0.0.1:5501/html/dashboard.html";
}

function dashboard_agent(){
    window.location.href = "http://127.0.0.1:5501/html/dashboard_agent.html";
}



function dashboard_payment(){
    window.location.href = "http://127.0.0.1:5501/html/dashboard_payment.html";
}
function dashboard_shopping(){
    window.location.href = "http://127.0.0.1:5501/html/dashboard_shopping.html";
}



async function sendmoney_user() {  
    const useremail = document.getElementById("useremail").value;
    const password = document.getElementById("passwordsendmoney").value;
    const youremail = localStorage.getItem("useremail")
    const amount = document.getElementById("amount_sendmoney").value;
    const reference = document.getElementById("reference_cashout").value;
    
    const user = { 
        useremail: useremail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference
    };
    
    const res = await fetch("http://localhost:4000/sendmoney_user", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Send money Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful.html";
            } else {
                showToast("Send money unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}





async function paybill_user() {  
    const paybillemail = document.getElementById("paybillemail").value;
    const password = document.getElementById("password_paybill").value;
    const youremail = localStorage.getItem("useremail")
    const amount = document.getElementById("amount_paybill").value;
    const reference = document.getElementById("reference_paybill").value;
    const selectElement = document.getElementById("bill");
    const type = selectElement.value;

    console.log(type)
    const user = { 
        paybillemail: paybillemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference, 
        type: type
    };
    
    const res = await fetch("http://localhost:4000/paybill_user", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Pay bill Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful.html";
            } else {
                showToast("Pay bill unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function paybill_agent() {  
    const paybillemail = document.getElementById("paybillemail").value;
    const password = document.getElementById("password_paybill").value;
    const youremail = localStorage.getItem("agentemail")
    const amount = document.getElementById("amount_paybill").value;
    const reference = document.getElementById("reference_paybill").value;
    const selectElement = document.getElementById("bill");
    const type = selectElement.value;

    console.log(type)
    const user = { 
        paybillemail: paybillemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference, 
        type: type
    };
    
    const res = await fetch("http://localhost:4000/paybill_agent", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Pay bill Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_agent.html";
            } else {
                showToast("Pay bill unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function paybill_payment() {  
    const paybillemail = document.getElementById("paybillemail").value;
    const password = document.getElementById("password_paybill").value;
    const youremail = localStorage.getItem("email")
    const amount = document.getElementById("amount_paybill").value;
    const reference = document.getElementById("reference_paybill").value;
    const selectElement = document.getElementById("bill");
    const type = selectElement.value;

    console.log(type)
    const user = { 
        paybillemail: paybillemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference, 
        type: type
    };
    
    const res = await fetch("http://localhost:4000/paybill_payment", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Pay bill Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_payment.html";
            } else {
                showToast("Pay bill unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function paybill_shopping() {  
    const paybillemail = document.getElementById("paybillemail").value;
    const password = document.getElementById("password_paybill").value;
    const youremail = localStorage.getItem("emailshopping")
    const amount = document.getElementById("amount_paybill").value;
    const reference = document.getElementById("reference_paybill").value;
    const selectElement = document.getElementById("bill");
    const type = selectElement.value;

    console.log(type)
    const user = { 
        paybillemail: paybillemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference, 
        type: type
    };
    
    const res = await fetch("http://localhost:4000/paybill_shopping", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Pay bill Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_shopping.html";
            } else {
                showToast("Pay bill unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function payment_user() {  
    const paymentemail = document.getElementById("paymentemail").value;
    const password = document.getElementById("password_payment").value;
    const youremail = localStorage.getItem("useremail")
    const amount = document.getElementById("amount_payment").value;
    const reference = document.getElementById("reference_payment").value;
    const selectElement = document.getElementById("bill");
    const type = selectElement.value;

    console.log(type)
    const user = { 
        paymentemail: paymentemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference, 
        type: type
    };
    
    const res = await fetch("http://localhost:4000/payment_user", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Pay bill Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful.html";
            } else {
                showToast("Pay bill unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}




async function payment_agent() {  
    const paymentemail = document.getElementById("paymentemail").value;
    const password = document.getElementById("password_payment").value;
    const youremail = localStorage.getItem("agentemail")
    const amount = document.getElementById("amount_payment").value;
    const reference = document.getElementById("reference_payment").value;
    const selectElement = document.getElementById("bill");
    const type = selectElement.value;

    console.log(type)

    const user = { 
        paymentemail: paymentemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference, 
        type: type
    };
    
    const res = await fetch("http://localhost:4000/payment_agent", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Pay bill Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_agent.html";
            } else {
                showToast("Pay bill unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}




async function payment_payment() {  
    const paymentemail = document.getElementById("paymentemail").value;
    const password = document.getElementById("password_payment").value;
    const youremail = localStorage.getItem("email")
    const amount = document.getElementById("amount_payment").value;
    const reference = document.getElementById("reference_payment").value;
    const selectElement = document.getElementById("bill");
    const type = selectElement.value;

    console.log(type)

    const user = { 
        paymentemail: paymentemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference, 
        type: type
    };
    
    const res = await fetch("http://localhost:4000/payment_payment", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Pay bill Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_payment.html";
            } else {
                showToast("Pay bill unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}




async function payment_shopping() {  
    const paymentemail = document.getElementById("paymentemail").value;
    const password = document.getElementById("password_payment").value;
    const youremail = localStorage.getItem("emailshopping")
    const amount = document.getElementById("amount_payment").value;
    const reference = document.getElementById("reference_payment").value;
    const selectElement = document.getElementById("bill");
    const type = selectElement.value;

    console.log(type)

    const user = { 
        paymentemail: paymentemail,
        password: password,
        amount: amount,
        youremail: youremail,
        reference:reference, 
        type: type
    };
    
    const res = await fetch("http://localhost:4000/shopping_shopping", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Pay bill Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_shopping.html";
            } else {
                showToast("Pay bill unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}




async function editprofile() {  
    const username = document.getElementById("username").value;
    const currentpassword = document.getElementById("currentpassword").value;
    const youremail = localStorage.getItem("useremail")
    const newpassword = document.getElementById("newpassword").value;
    const confirmpassword = document.getElementById("confirmpassword").value;


    console.log("dulal")
    const user = { 
        username:username,
        currentpassword:currentpassword,
        youremail:youremail,
        newpassword:newpassword,
        confirmpassword:confirmpassword
    };
    console.log(user)
    
    const res = await fetch("http://localhost:4000/editprofile", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Edit profile Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful.html";
            } else {
                showToast("edit profile unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}




async function editprofile_agent() {  
    const agentname = document.getElementById("agentname").value;
    const agentcurrentpassword = document.getElementById("agentcurrentpassword").value;
    const youremail = localStorage.getItem("agentemail")
    const agentnewpassword = document.getElementById("agentnewpassword").value;
    const agentconfirmpassword = document.getElementById("agentconfirmpassword").value;


    console.log("dulal")
    const user = { 
        agentname:agentname,
        agentcurrentpassword:agentcurrentpassword,
        youremail:youremail,
        agentnewpassword:agentnewpassword,
        agentconfirmpassword:agentconfirmpassword
    };
    console.log(user)
    
    const res = await fetch("http://localhost:4000/editprofile_agent", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Edit profile Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_agent.html";
            } else {
                showToast("edit profile unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function editprofile_payment() {  
    const agentname = document.getElementById("agentname").value;
    const agentcurrentpassword = document.getElementById("agentcurrentpassword").value;
    const youremail = localStorage.getItem("email")
    
    const agentnewpassword = document.getElementById("agentnewpassword").value;
    const agentconfirmpassword = document.getElementById("agentconfirmpassword").value;


    console.log("dulal")
    const user = { 
        agentname:agentname,
        agentcurrentpassword:agentcurrentpassword,
        youremail:youremail,
        agentnewpassword:agentnewpassword,
        agentconfirmpassword:agentconfirmpassword
    };
    console.log(user)
    
    const res = await fetch("http://localhost:4000/editprofile_payment", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Edit profile Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_payment.html";
            } else {
                showToast("edit profile unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}



async function editprofile_shopping() {
    const agentname = document.getElementById("agentname").value;
    const agentcurrentpassword = document.getElementById("agentcurrentpassword").value;
    const youremail = localStorage.getItem("emailshopping")
    
    const agentnewpassword = document.getElementById("agentnewpassword").value;
    const agentconfirmpassword = document.getElementById("agentconfirmpassword").value;


    console.log("dulal")
    const user = { 
        agentname:agentname,
        agentcurrentpassword:agentcurrentpassword,
        youremail:youremail,
        agentnewpassword:agentnewpassword,
        agentconfirmpassword:agentconfirmpassword
    };
    console.log(user)
    
    const res = await fetch("http://localhost:4000/editprofile_shopping", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    if (res.ok) {
        try {
            const response = await res.json();
            console.log(response.num);
            if (response.num === 1) { // Check the property "num" of the response
                showToast("Edit profile Successful!");
                window.location.href = "http://127.0.0.1:5501/html/successful_shopping.html";
            } else {
                showToast("edit profile unsuccessful");
            }
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            showToast("Error: Unable to parse server response");
        }
    } else {
        console.error("Server error:", res.status, res.statusText);
        showToast("Error: Server error occurred");
    }

    
}

















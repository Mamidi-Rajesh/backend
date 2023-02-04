import React, {useState,useContext} from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import "../css/SignIn.css";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";

function SignIn(){
    const {setUserLogin}=useContext(LoginContext)
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


     //TOAST FUNCTION
     const notifyA=(msg)=>toast.error(msg, {position: "top-center",})
     const notifyB=(msg)=>toast.success(msg, {position: "top-center",})

     
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const postData = ()=>{
        //checking email
       if(!emailRegex.test(email)){
        notifyA("Invalid email")
        return
       }


       //sending data to server
       fetch("/signin",{
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
           email:email,
           password:password 
        })
       }).then(res=>res.json())
       
       .then(data=>{
        if(data.error){
            notifyA(data.error)
        }
        else{
            notifyB("Signed In Successfully")
            console.log(data)
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            setUserLogin(true)
            navigate("/")
        }
        console.log(data)})

    }


    return(
        <div className="container">
        <div className="illustration-img">
        <img src="https://i.pinimg.com/originals/77/12/66/7712662202eaec6176a883c7e30c6daf.gif" alt=""/>
        </div>

        <div className="signIn">
            <div>
                <div className="loginForm">
                <img className="signInLogo" src={logo} alt=""/>
                {/* SIGN IN */}
               {/* Login Form */}
               <div>
                    <input type="email" 
                    name="email" 
                    id="email"
                    value={email}
                    placeholder="Enter Your Email" 
                    onChange={(e)=> {setEmail(e.target.value)}}
                    />
                </div>

             {/* PASSWORD */}
             <div>
                    <input type="password" 
                    name="password" 
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <input 
                type="submit"
                id="login-btn"
                onClick={()=>{
                    postData()
                }}
                value="Sign In"/>
                </div>
                 
                 {/* SIGN IN FORM END */}
                 <div className="loginForm2">
                   Don't have an account ? 
                   <Link to="/signup">
                    <span>Sign Up</span>
                   </Link>
                 </div>
            </div>
        </div>
        </div>
    );
};

export default SignIn;
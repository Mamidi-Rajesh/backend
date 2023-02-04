import React, {useEffect,useState }from "react";
import { Link, useNavigate} from "react-router-dom";
import logo from "../img/logo.png";
import "../css/SignUp.css";
import { toast } from "react-toastify";

function SignUp(){
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    //TOAST FUNCTION
    const notifyA=(msg)=>toast.error(msg, {position: "top-center",})
    const notifyB=(msg)=>toast.success(msg, {position: "top-center",})

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    


    const postData = ()=>{
        //checking email
       if(!emailRegex.test(email)){
        notifyA("Invalid email")
        return
       }else if(!passRegex.test(password)){
        notifyA("Password must contain atleast 8 characters, including atleast 1 number & 1 includes both lower and uppercase letters and special characters for example #,?,!")
        return
       }
       //sending data to server
       fetch("/signup",{
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
           name: name,
           userName: userName,
           email:email,
           password:password 
        })
       }).then(res=>res.json())
       
       .then(data=>{
        if(data.error){
            notifyA(data.error)
        }
        else{
            notifyB(data.message)
            navigate("/signin")
        }
        console.log(data)})
    }
    return(
       <div className="container">
        <div className="illustration-img">
        <img src="https://i.pinimg.com/originals/77/12/66/7712662202eaec6176a883c7e30c6daf.gif" alt=""/>
        </div>

      
        <div className="signUp"> 
            <div className="form-container">
                <div className="form">
                <img className="signUpLogo" src={logo} alt=""/>
                <p className="loginPara"> 
                Sign up tocd see photos and videos <br/> from your friends</p>

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


                 {/* ENTER FULL NAME */}
                <div>
                    <input type="text" 
                    name="name" 
                    id="name"
                    value={name}
                    placeholder="Enter Full Name"
                    onChange={((e)=>{
                        setName(e.target.value)
                    })}/>
                </div>
               
               {/* ENTER USER NAME */}
                <div>
                    <input type="text" 
                    name="username" 
                    id="username"
                    placeholder="Enter Username"
                    value={userName}
                    onChange={(e)=>{setUserName(e.target.value)}}
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

                <p className="loginpara">
                    By signing up, you agree to our Terms, <br/> privacy
                    policy and cookies policy.
                </p>

                {/* SUBMIT */}
                <input type="submit"
                   id="submit-btn"
                   value="Sign Up"
                   onClick={()=>{postData()}}/>
            </div>
            {/* Login form ended */}

            <div className="form2">
            Already have an account ?
            <Link to="/signin">
                <span>Sign In</span>
            </Link>
            
            </div>
        </div>
        </div>
        </div>
    );
};

export default SignUp;
import React, { useEffect, useState } from "react";
import "../css/Createpost.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

       //IMAGES
//import pizza from "../img/food poster 2.png";
import uploadimage from "../img/imageupload.png"
import rajesh_designs from "../img/rajesh designs logo.png"; 

function Createpost(){
    const navigate = useNavigate();
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("")

    //TOAST FUNCTION
    const notifyA=(msg)=>toast.error(msg, {position: "top-center",})
    const notifyB=(msg)=>toast.success(msg, {position: "top-center",})


    useEffect(()=>{
     //SAVING POST TO MONGODB
     if(url){
     fetch("/createPost", {
        method: "post",
        headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
    },
    body:JSON.stringify({
        body,
        pic: url
    })
    }).then(res=>res.json())
    .then(data=>{if(data.error){
        notifyA(data.error)
    }else{
        notifyB("Successfully Posted")
        navigate("/")
    }})
    .catch(err=> console.log(err))
}
    },[url])




   // POSTING IMAGE TO CLOUDINARY
    const postDetails = ()=> {
        console.log(body,image);
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "exporz-app")
        data.append("clodu_name", "exporz-app")
        fetch("https://api.cloudinary.com/v1_1/exporz-app/image/upload", {
            method: "post",
            body: data
        }).then(res=>res.json())
        .then(data => setUrl(data.url))
        .catch(err => console.log(err))

        
    }

    //ADDING PREVIEW
    const loadfile = (event)=>{
        var reader = new FileReader();
        reader.onload = function(){
          var output = document.getElementById('output');
          output.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }


    return(
        <div className="createpost-page">
            <div className="createPost">
                   {/* post-header */}
            <div className="post-header">
                <h4>Create New Post</h4>
                <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
            </div>
              
              {/* image preview */}
            <div className="main-div">
                <img id="output" src={uploadimage}/>
                <input 
                 type="file"
                 accept="image/*"
                 onChange={(event)=>{loadfile(event);
                 setImage(event.target.files[0])
                 }}/>
            </div>

            {/* DETAILS */}

            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img src={rajesh_designs} />
                    </div>
                    <h5>Rajesh_Designs</h5>
                </div>

                <textarea value={body} onChange={(e)=>{
                    setBody(e.target.value)
                }}
                typeof="text" placeholder="Write a caption..."></textarea>
            </div>
        </div>


        {/* FOOTER */}
<div className="footer-section">
        <div className="footer">
            <p>Meta</p>
            <p>About</p>
            <p>Blog</p>
            <p>Jobs</p>
            <p>Help</p>
            <p>API</p>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Locations</p>
            <p>Contact</p>
          </div>

          <div className="copyright">
                <select style={{border: "none", width:"4.5rem"}}>
                <option value="EN">English</option>    
                <option value="AF">Afrikaans</option>
                <option value="SQ">Albanian</option>
                <option value="AR">Arabic</option>
                <option value="HY">Armenian</option>
                <option value="EU">Basque</option>
                <option value="BN">Bengali</option>
                <option value="BG">Bulgarian</option>
                <option value="CA">Catalan</option>
                <option value="KM">Cambodian</option>
                <option value="ZH">Chinese (Mandarin)</option>
                <option value="HR">Croatian</option>
                <option value="CS">Czech</option>
                <option value="DA">Danish</option>
                <option value="NL">Dutch</option>
                <option value="ET">Estonian</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finnish</option>
                <option value="FR">French</option>
                <option value="KA">Georgian</option>
                <option value="DE">German</option>
                <option value="EL">Greek</option>
                <option value="GU">Gujarati</option>
                <option value="HE">Hebrew</option>
                <option value="HI">Hindi</option>
                <option value="HU">Hungarian</option>
                <option value="IS">Icelandic</option>
                <option value="ID">Indonesian</option>
                <option value="GA">Irish</option>
                <option value="IT">Italian</option>
                <option value="JA">Japanese</option>
                <option value="JW">Javanese</option>
                <option value="KO">Korean</option>
                <option value="LA">Latin</option>
                <option value="LV">Latvian</option>
                <option value="LT">Lithuanian</option>
                <option value="MK">Macedonian</option>
                <option value="MS">Malay</option>
                <option value="ML">Malayalam</option>
                <option value="MT">Maltese</option>
                <option value="MI">Maori</option>
                <option value="MR">Marathi</option>
                <option value="MN">Mongolian</option>
                <option value="NE">Nepali</option>
                <option value="NO">Norwegian</option>
                <option value="FA">Persian</option>
                <option value="PL">Polish</option>
                <option value="PT">Portuguese</option>
                <option value="PA">Punjabi</option>
                <option value="QU">Quechua</option>
                <option value="RO">Romanian</option>
                <option value="RU">Russian</option>
                <option value="SM">Samoan</option>
                <option value="SR">Serbian</option>
                <option value="SK">Slovak</option>
                <option value="SL">Slovenian</option>
                <option value="ES">Spanish</option>
                <option value="SW">Swahili</option>
                <option value="SV">Swedish </option>
                <option value="TA">Tamil</option>
                <option value="TT">Tatar</option>
                <option value="TE">Telugu</option>
                <option value="TH">Thai</option>
                <option value="BO">Tibetan</option>
                <option value="TO">Tonga</option>
                <option value="TR">Turkish</option>
                <option value="UK">Ukrainian</option>
                <option value="UR">Urdu</option>
                <option value="UZ">Uzbek</option>
                <option value="VI">Vietnamese</option>
                <option value="CY">Welsh</option>
                <option value="XH">Xhosa</option>
                </select>
                <p> &copy;2023 Exporz by Rajesh_designs</p>
            </div>
        </div> 
        </div>
    )
}

export default Createpost;
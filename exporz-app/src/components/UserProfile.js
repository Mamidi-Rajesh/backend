import React, {useEffect,useState} from "react";
import "../css/Profile.css";
import { useParams } from "react-router-dom";

       // IMAGES
// import rajesh_designs from "../img/rajesh designs logo.png";
import PostDetail from "./postDetail";

function UserProfile(){
    var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
    const {userid} = useParams();
    
    const [isFollow, setIsFollow] =useState(false);
    const [show, setShow]= useState(false);
    const [user, setUser] = useState([])
    const [posts, setPosts]= useState([]);

    const toggleDetails = (posts)=>{
        if(show){
            setShow(false);
        }else{
            setShow(true);
            setPosts(posts);
            console.log(posts)
        }
       };
  
//TO FOLLOW USER
const followUser=(userId)=>{
    fetch("/follow",{
        method: "put",
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId: userId,
        }),
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        setIsFollow(true);
    });
};


//TO UNFOLLOW USER
const unfollowUser=(userId)=>{
    fetch("http://localhost:5000/unfollow",{
        method: "put",
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            followId: userId,
        }),
    })
    .then((res)=>{res.json()})
    .then((data)=>{
        console.log(data);
        setIsFollow(false);
    });
};

      useEffect(()=>{

          fetch(`/user/${userid}`,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
          })
          .then(res=>res.json())
          .then((result)=>{
            console.log(result);
            setUser(result.user);
            setPosts(result.post);
            if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
                setIsFollow(true)
            }
          });
      },[isFollow]);

    return(
       <div className="userProfile-page">
         <div className="profile">
            {/* Profile-section */}
            <div className="profile-frame">

                {/* profile-pic */}
                <div className="profile-pic">
                    <img src={user.Photo ? user.Photo : picLink} alt=""/>
                </div>

                {/* profile-data */}
                <div className="profile-data">
                    <div style={{display:"flex", 
                         alignItems:"center", 
                         justifyContent:"space-between"}}>
                    <h1>{user.name}</h1>
                    <button className="followBtn"
                    onClick={()=>{
                        if(isFollow){
                            unfollowUser(user._id)
                        }else{
                            followUser(user._id)
                        }}
                        }
                        
                    >{isFollow ? "Unfollow" : "Follow"}</button>
                    </div>
                  
                    <div className="profile-info">
                        <p>{posts.length} posts</p>
                        <p>{user.followers ? user.followers.length:"0"} followers</p>
                        <p>{user.following ? user.following.length:"0"} following</p>
                    </div>
                    <hr style={{width:"120%",
                                margin:" 25px auto",
                                opacity:"0.8",
                                  }}/>

                </div>
            </div>

            {/* Gallery */}
             <div className="gallery">
               {posts.map((pics)=>{
                return <img key={pics._id} src={pics.photo}
                // onClick={()=>{
                //   toggleDetails(pics)
                //  }}
                className="item" alt=""  />
               })}
             </div>
             {/* {show &&
             <PostDetail item={posts} toggleDetails={toggleDetails}/>
             }     */}
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
    );
};

export default UserProfile;
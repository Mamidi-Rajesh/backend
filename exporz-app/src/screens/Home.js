import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import rajesh_designs from "../img/rajesh designs logo.png";

function Home(){
   var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
   const navigate=useNavigate();
   const [data, setData]=useState([]);
   const [comment, setComment]=useState("");
   const [show, setShow] = useState(false);
   const [item, setItem] = useState([])

   useEffect(()=>{
    const token = localStorage.getItem("jwt");
    if(!token){
        navigate("./signup");
    }

    //FETCHING ALL POSTS
    fetch("/allposts",{
        headers:{
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
        },
    }).then((res)=>res.json())
    .then((result)=>{
        console.log(result);
        setData(result);
    })
    .catch(err=> console.log(err));
   },[]);

   //TO SHOW AND HIDE COMMITS
   const toggleComment = (posts)=>{
    if(show){
        setShow(false);
    }else{
        setShow(true);
        setItem(posts);
        // console.log(item)
    }
   };

   //FETCHING LIKE POST SECTION
   const likePost =(id)=>{
    fetch("/like",{
        method:"put",
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id,
        })
    }).then((res)=>res.json())
    .then((result)=>{
        const newData= data.map((posts)=>{
            if(posts._id == result._id){
                return result;
            }else{
                return posts;
            }
        });
        setData(newData);
        console.log(result)
    });
   };

   //FETCHING UNLIKE POST SECTION
   const unlikePost =(id)=>{
    fetch("/unlike",{
        method:"put",
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id,
        }),
    })
    .then((res)=>res.json())
    .then((result)=>{
        const newData= data.map((posts)=>{
            if(posts._id == result._id){
                return result;
            }else{
                return posts;
            }
        })
        setData(newData);
        console.log(result)
    });
   };

   //function to make comment
   const makeComment = (text,id)=>{
    fetch("/comment",{
        method:"put",
        headers:{
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            text:text,
            postId:id,
        })
    }).then((res)=>res.json())
    .then((result)=>{
        const newData= data.map((posts)=>{
            if(posts._id == result._id){
                return result;
            }else{
                return posts;
            }
        });
        setData(newData);
        setComment("");
        console.log(result);
    });
   };


    return (
     
         
         <div className="home">
        {/* card */}
        {data.map((posts)=>{
            
          return(
           
            <div className="card">
            {/* card header */}
            <div className="card-header">
                <div className="card-pic">
                <img
                  src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                // src={rajesh_designs}
                  alt="" 
                />
                </div>
                <h5>
                    <Link to={`/profile/${posts.postedBy._id}`}>
                    {posts.postedBy.name}
                    </Link> 
                </h5>
            </div>

            {/* card image */}
            <div className="card-image">
                <img src={posts.photo} alt=""  onClick={()=>{toggleComment(posts)}}/>
            </div>

            {/* card-content */}
            <div className="card-content">
                {
                    posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                    ?
                    (<span className="material-symbols-outlined material-symbols-outlined-red"
                        onClick={()=>{unlikePost(posts._id);}}>favorite</span>)
                        :
                    (<span className="material-symbols-outlined"
                        onClick={()=>{likePost(posts._id);}}>favorite</span>)
                }
              
               
                <p>{posts.likes.length} Likes</p>
                <p>{posts.body}</p>
                <p style={{fontWeight:"bold",
                 cursor: "pointer"}}
                onClick={()=>{toggleComment(posts)}}
                >View all comments</p>
            </div>

                {/* adding comments */}
            <div className="add-comment">
                 <span className="material-symbols-outlined">mood</span>
                 <input type="text" 
                 placeholder="Add a comment"
                 value={comment}
                 onChange={(e)=>{setComment(e.target.value)}}
                 />
                 <button className="comment" 
                 onClick={()=>{
                    makeComment(comment,posts._id);
                 }}>Post</button>
            </div>
        </div>
          )
        })}

    {/* SHOW COMMENT */}
    {show && (
        <div className="showComment">
        <div className="container">
            <div className="postPic">
                <img src={item.photo} alt="" />
            </div>
            <div className="details">

                {/* CARD HEADER */}
            <div className="card-header">
                <div className="card-pic">
                    <img src={rajesh_designs} alt=""/>
                </div>
                <h5>{item.postedBy.name}</h5>
            </div>

             {/* COMMENT SECTION */}
             <div className="comment-section">
                {
                    item.comments.map((comment)=>{
                      return(
                        <p className="comm">
                        <span className="commenter" style={{fontWeight: "bolder"}}>{comment.postedBy.name}{" "}</span>
                        <span className="commentText"> {comment.comment}</span>
                    </p>
                      )  
                    })
                }
               
             </div>

              {/* card-content */}
            <div className="card-content">
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
            </div>

             {/* adding comments */}
             <div className="add-comment">
                 <span className="material-symbols-outlined">mood</span>
                 <input type="text" 
                 placeholder="Add a comment"
                 value={comment}
                 onChange={(e)=>{setComment(e.target.value)}}
                 />
                 <button className="comment" 
                 onClick={()=>{
                    makeComment(comment, item._id);
                    toggleComment();
                 }}
                >Post</button>
            </div>

            </div>
        </div>
        <div className="close-comment" 
           onClick={()=>{toggleComment()}}>
            <span className="material-symbols-outlined
            material-symbols-outlined-comment" >
                close</span>
        </div>
    </div>
    )}



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

export default Home;




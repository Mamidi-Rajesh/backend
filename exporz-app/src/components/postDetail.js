import React from "react";
import "../css/postDetail.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PostDetail({item, toggleDetails}){
    const navigate = useNavigate();

    //TOAST FUNCTION
    //const notifyA=(msg)=>toast.error(msg, {position: "top-center",})
    const notifyB=(msg)=>toast.success(msg, {position: "top-center",})

     const removePost = (postId)=>{
        // console.log(postId);
        if(window.confirm("Do you really want to delete this post ?")){

        fetch(`/deletePost/${postId}`, {
            method: "delete" ,
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log(result);
            toggleDetails();
            navigate("/");
            notifyB(result.message);
        })
    }
     }


    return(
        <div className="showComment">
        <div className="container">
            <div className="postPic">
                <img src={item.photo} alt="" />
            </div>
            <div className="details">

                {/* CARD HEADER */}
            <div className="card-header">
                <div className="card-pic">
                    <img src={item.photo} alt=""/>
                </div>
                <h5>{item.postedBy.name}</h5>
                <div className="deletePost" >
                   <span className="material-symbols-outlined"
                   onClick={()=>{removePost(item._id)}}
                   >
                    delete
                   </span>
                </div>
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
                      );  
                    })
                }
               
             </div>

              {/* card-content */}
            <div className="card-content">
               
                   
              
               
                <p>{item.likes.length}Likes</p>
                <p>{item.body}</p>
            </div>

             {/* adding comments */}
             <div className="add-comment">
                 <span className="material-symbols-outlined">mood</span>
                 <input type="text" 
                 placeholder="Add a comment"
                //  value={comment}
                //  onChange={(e)=>{setComment(e.target.value)}}
                 />
                 <button className="comment" 
                //  onClick={()=>{
                //     makeComment(comment, item._id);
                //     toggleComment();
                //  }}
                >Post</button>
            </div>

            </div>
        </div>
        <div className="close-comment" 
           onClick={()=>{toggleDetails()}}
        >
            <span className="material-symbols-outlined
            material-symbols-outlined-comment" >
                close</span>
        </div>
    </div>
    );
};

export default PostDetail;
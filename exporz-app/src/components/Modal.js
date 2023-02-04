import React from "react";
import {RiCloseLine} from "react-icons/ri";
import "../css//Modal.css";
import { useNavigate } from "react-router-dom";


function Modal({setModalOpen}){
    const navigate= useNavigate()
    return(
        <div className="darkBg" onClick={()=>setModalOpen(false)}>
           <div className="centered">
           <div className="modal">
        {/* MODAL HEADER */}
        <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
        </div>

            {/* BUTTON */}
            <button className="closeBtn" onClick={()=>setModalOpen(false)}>
           <RiCloseLine></RiCloseLine>
            </button>

            {/* MODAL CONTENT */}
            <div className="modalContent">
                Are you really want to log Out ?
            </div>

            <div className="modalActions">
                <div className="cationsContainer">
                    <button className="logOutBtn" onClick={()=>{
                        setModalOpen(false);
                        localStorage.clear()
                        navigate("./signin")
                    }}>Log Out</button>
                    <button className="cancelBtn" onClick={()=>setModalOpen(false)}>cancel</button>
                </div>
            </div>
       </div>
        </div>
        </div>
       


       
    )
}

export default Modal;
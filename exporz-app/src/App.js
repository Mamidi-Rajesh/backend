import './App.css';
import React, {createContext,useState} from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './screens/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './screens/Profile';
import Createpost from './screens/Createpost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from './context/LoginContext';
import Modal from './components/Modal';
import UserProfile from './components/UserProfile';
import MyFolliwngPost from './screens/MyFollowingPost';
import ScrollToTop from "react-scroll-to-top";




function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen]= useState(false);
  return (

    <BrowserRouter>
    <ScrollToTop smooth style={{backgroundColor: "#1876FB", color:"white"}}/>
    <div className="App">
    <LoginContext.Provider value={{setUserLogin, setModalOpen}}>
    <Navbar login={userLogin}/> 

{/*Routing  */}
<Routes>
 <Route path="/" element={<Home/>}></Route>
 <Route path="/signup" element={<SignUp/>}></Route>
 <Route path="/signin" element={<SignIn/>}></Route>
 <Route exact path="/profile" element={<Profile/>}></Route>
 <Route path="/createpost" element={<Createpost/>}></Route>
 <Route path="/profile/:userid" element={<UserProfile/>}></Route>
 <Route path="/followingpost" element={<MyFolliwngPost />}></Route> 
</Routes>
<ToastContainer theme='dark'/>
   {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
    </LoginContext.Provider>
   
    </div>
    </BrowserRouter>
    
  );
}

export default App;

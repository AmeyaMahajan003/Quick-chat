import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import { useSelector } from "react-redux";

const Home = () => {
  const {selectedChat} = useSelector(state => state.userReducer);
  return (
    <div className="home-page">
      <Header/>
      <div className="main-content">
        <Sidebar/>
        {selectedChat && <Chat/>}
        
      </div>
    </div>
  );
};

export default Home;

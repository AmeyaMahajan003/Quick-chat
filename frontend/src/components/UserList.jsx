import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "../apiCalls/chat";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { setAllChats, setSelectedChat } from "../redux/userSlice";

const UserList = ({ searchKey }) => {
  const { allUsers,allChats,user : currentUser,selectedChat } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const startNewChat = async (searchUserId) => {
    try {
      dispatch(showLoader());
      const response = await createNewChat([currentUser._id, searchUserId]);
      dispatch(hideLoader());
      if(response.success){
        toast.success(response.message);
        const newChat = response.data;
        const updatedChat = [...allChats,newChat];
        dispatch(setAllChats(updatedChat));
        dispatch(setSelectedChat(newChat));
      }
    } catch (error) {
      toast.error(error);
      dispatch(hideLoader());
    }
  }

  const isSelectedChat = (user)=>{
    if(selectedChat){
      return selectedChat.members.map(m=> m._id).includes(user._id);
    }
    return false;
  }
  const openChat = async (selectedUserId) => {
    const chat = allChats.find(chat =>
      chat.members.map(m=> m._id).includes(currentUser._id) &&
      chat.members.map(m=> m._id).includes(selectedUserId) 
     )
     if(chat){
      dispatch(setSelectedChat(chat));
     }
  }
  
  return allUsers
  .filter((user)=>{
    return ((user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchKey.toLowerCase())) && searchKey)
    || (allChats.some(chat => chat.members.map(m=> m._id).includes(user._id)))
  })
  .map((user , index) => {
    return (
      <div className="user-search-filter" key={user._id} onClick={() => openChat(user._id)}>
        <div className={isSelectedChat(user)?"selected-user":"filtered-user"}>
          <div className="filter-user-display">
            {user.profilePic
            ?<img src={user.profilePic} alt="Profile Pic" className="user-profile-image"></img>
            :<div className={isSelectedChat(user)?"selected-user-avatar":"user-default-profile-pic"}>{user.firstName.charAt(0).toUpperCase()+user.lastName.charAt(0).toUpperCase()}</div>}
            
            <div className="filter-user-details">
              <div className="user-display-name">{user.firstName+' '+user.lastName}</div>
              <div className="user-display-email">{user.email}</div>
            </div>
           { !allChats.find(chat =>chat.members.map(m=> m._id).includes(user._id)) 
              ?<div className="user-start-chat">
              <button className="user-start-chat-btn" onClick={()=>{startNewChat(user._id)}}>Start Chat</button>
            </div>
            :<></>}
          </div>
        </div>
      </div>
    );
  });
};

export default UserList;

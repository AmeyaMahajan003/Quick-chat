import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMessage, getAllMessage } from "../apiCalls/message";
import { showLoader, hideLoader } from "../redux/loaderSlice";
import toast from "react-hot-toast";
import moment from 'moment';

const Chat = () => {
  const { selectedChat, user } = useSelector((state) => state.userReducer);
  const selectedUser = selectedChat.members.find((u) => u._id !== user._id);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const sendMessage = async () => {
    try {
      const newMessage = {
        chatId: selectedChat._id,
        sender: user._id,
        text: message,
      };
      dispatch(showLoader());
      const response = await createNewMessage(newMessage);
      dispatch(hideLoader());
      if (response.success) {
        setMessage("");
        getMessage();
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };
  const formatTime = (timestamp)=>{
      const now = moment();
      const diff = now.diff(moment(timestamp), 'days');
      if(diff<1)
      {
        return `Today ${moment(timestamp).format('hh:mm A')}`
      }else if (diff===1){
        return `Yesterday ${moment(timestamp).format('hh:mm A')}`
        
      }else{
        return `${moment(timestamp).format('MMM D, hh:mm A')}`
        
      }
  }

  const getMessage = async () => {
    try {
      dispatch(showLoader());
      const response = await getAllMessage(selectedChat._id);
      dispatch(hideLoader());
      if (response.success) {
        setAllMessages(response.data);
      }
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessage();
  }, [selectedChat]);

  return (
    <>
      {selectedChat && (
        <div className="app-chat-area">
          <div className="app-chat-area-header">
            {selectedUser.firstName + " " + selectedUser.lastName}
          </div>
          <div className="main-chat-area">
            {allMessages.map((msg) => {
              return (
                  <div className="message-container" style={msg.sender === user._id?{justifyContent : 'end'}:{justifyContent : 'start'}}>
                    <div>
                    <div className={msg.sender === user._id?"send-message":'received-message'}>{msg.text}</div>
                    <div className="message-timestamp" style={msg.sender === user._id?{float : 'right'}:{float : 'left'}}>
                      {formatTime(msg.createdAt)}
                      </div>
                    </div>
                  </div>
              );
            })}
          </div>

          <div className="send-message-div">
            <input
              type="text"
              className="send-message-input"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="fa fa-paper-plane send-message-btn"
              aria-hidden="true"
              onClick={sendMessage}
            ></button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;

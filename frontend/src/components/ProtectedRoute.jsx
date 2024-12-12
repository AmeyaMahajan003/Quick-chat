import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getLoggedUser, getAllUsers } from '../apiCalls/users';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader,hideLoader } from '../redux/loaderSlice';
import { setUser,setAllUsers, setAllChats } from '../redux/userSlice';
import {toast} from 'react-hot-toast'
import { getAllChats } from '../apiCalls/chat';

const ProtectedRoute = ({children}) => {

    const {user,allUsers} = useSelector(state => state.userReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getLoggedInUser = async () => {

        try {
          dispatch(showLoader());
          const response = await getLoggedUser();
          dispatch(hideLoader());
          
          if(response.success){
            dispatch(setUser(response.data));
          }
          else{
            toast.error(response.message);
            navigate('/login');
          }
        } catch (error) {
          dispatch(hideLoader());
          navigate('/login');
        }
    }

    const getallusers = async () => {
      try {
        dispatch(showLoader());
        const response = await getAllUsers();
        dispatch(hideLoader());
      
        if(response.success){
          dispatch(setAllUsers(response.data));
        }
        else{
          toast.error(response.message);
          navigate('/login');
        }
      } catch (error) {
        dispatch(hideLoader());
        navigate('/login');
      }
    }
    const getCurrentUserChats = async () => {
      try {
        const response = await getAllChats();
        
        if(response.success){
          dispatch(setAllChats(response.data));
        }
        else{
          toast.error(response.message);
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
          getLoggedInUser();
          getallusers();
          getCurrentUserChats();
        }else{
            navigate('/login');
        }
    },[]);

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute

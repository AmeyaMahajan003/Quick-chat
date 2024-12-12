import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { signupUser } from '../../apiCalls/auth';
import {toast} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/loaderSlice';


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user,setUser] = useState({
    firstName : '',
    lastName : '',
    email : '',
    password : ''
  });

  const onFormSubmit = async (event)=>{
      event.preventDefault();
      try {
        dispatch(showLoader());
        const response = await signupUser(user);
        dispatch(hideLoader());
        navigate('/login');

        if (response.success) {
          toast.success(response.message);
        }
        else{
          toast.error(response.message);
        }
      } catch (error) {
        dispatch(hideLoader());
        toast.error(error);
      }
  }

  return (
    <div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
            <div className="card_title">
                <h1>Create Account</h1>
            </div>
            <div className="form">
                <form onSubmit={onFormSubmit}>
                    <div className="column">
                        <input type="text" placeholder="First Name" value={user.firstName} onChange={(event)=>{setUser({...user,firstName : event.target.value})}}/>
                        <input type="text" placeholder="Last Name" value={user.lastName} onChange={(event)=>{setUser({...user,lastName : event.target.value})}}/>
                    </div>
                    <input type="email" placeholder="Email" value={user.email} onChange={(event)=>{setUser({...user,email : event.target.value})}}/>
                    <input type="password" placeholder="Password" value={user.password} onChange={(event)=>{setUser({...user,password : event.target.value})}}/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="card_terms">
                <span>Already have an account?
                    <Link to="/login">Login Here</Link>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Signup

import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { loginUser } from '../../apiCalls/auth';
import {toast} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/loaderSlice';

const Login = () => {

  const dispatch = useDispatch();

  const [user,setUser] = useState({
    email : '',
    password : ''
  });

  const onFormSubmit = async (event)=>{
    event.preventDefault();
    try {
      dispatch(showLoader());
      const response = await loginUser(user);
      dispatch(hideLoader());
      if (response.success) {
        toast.success(response.message);
        localStorage.setItem('token',response.token);
        window.location.href = '/';
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
    <div>
      <div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
        <div className="card_title">
            <h1>Login Here</h1>
        </div>
        <div className="form">
        <form onSubmit={onFormSubmit}>
            <input type="email" placeholder="Email" value={user.email} onChange={(event)=>{setUser({...user,email : event.target.value})}}/>
            <input type="password" placeholder="Password" value={user.password} onChange={(event)=>{setUser({...user,password : event.target.value})}}/>
            <button>Login</button>
        </form>
        </div>
        <div className="card_terms"> 
            <span>Don't have an account yet?
                <Link to="/signup">Signup Here</Link>
            </span>
        </div>
        </div>
    </div>
    </div>
  )
}

export default Login

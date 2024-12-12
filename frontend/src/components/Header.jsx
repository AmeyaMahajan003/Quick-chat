import React from "react";
import { useSelector } from 'react-redux';

const Header = () => {

    const {user} = useSelector(state => state.userReducer);
    

    function getFullName() {
        let fname = user?.firstName;
        let lname = user?.lastName;
        return fname+ ' ' + lname
    }
    function getInitials() {
        let fname = user?.firstName.charAt(0).toUpperCase();
        let lname = user?.lastName.charAt(0).toUpperCase();
        return fname+lname
    }

  return (
    <div className="app-header">
      <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Quick Chat
      </div>
      <div className="app-user-profile">
        <div className="logged-user-name">{getFullName()}</div>
        <div className="logged-user-profile-pic">
            {getInitials()}
        </div>
      </div>
    </div>
  );
};

export default Header;

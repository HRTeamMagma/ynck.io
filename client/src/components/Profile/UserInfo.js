import React from 'react';
import { Link } from 'react-router-dom';


const UserInfo = (props) => {
  return ( 
      <div className="profile_info">
        <img src={props.userInfo.profile_image} className="user_profile_image"/>
        <h2 className="user_display_name">{props.userInfo.first} {props.userInfo.last}</h2>
        <p>My tattoos are my source of strength, with which I channel sasha fierce.</p>
        { loggedInUser.id === props.userInfo.id ?
          <Link to={`/user/${props.userInfo.id}/edit`}>edit profile</Link>
          : null
        }
      </div>
  );
};


export default UserInfo;
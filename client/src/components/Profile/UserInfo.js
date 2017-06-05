import React from 'react';

const UserInfo = (props) => {
  return ( 
      <div className="profile_info">
        <img src={props.userInfo.profile_image} className="user_profile_image"/>
        <h2 className="user_display_name">{props.userInfo.first} {props.userInfo.last}</h2>
        <p>My tattoos are my source of strength, with which I channel sasha fierce.</p>
      </div>
  );
};


export default UserInfo;
import React from 'react';

const UserInfo = (props) => {
  return ( 
      <div className="profile_info">
        <img src={'./../../../../assets/images/beyonce_knowles.jpg'} className="user_profile_image"/>
        <h2 className="user_display_name">{props.userInfo.display}</h2>
        <h3>{props.userInfo.first} {props.userInfo.last}</h3>
        <p>My tattoos are my source of strength, with which I channel sasha fierce.</p>
      </div>
  );
};


export default UserInfo;
import React from 'react';

const UserInfo = (props) => {
  return ( 
      <div className="shop_info">
        <img src={'./../../../../assets/images/beyonce_knowles.jpg'} className="user_profile_image"/>
        <h2>{props.userInfo.display}</h2>
        <h3>{props.userInfo.first} {props.userInfo.last}</h3>
        <p>Lorem Ipsum Dolor </p>
      </div>
  );
};


export default UserInfo;
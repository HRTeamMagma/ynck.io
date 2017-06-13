import React from 'react';

const Following = (props) => {
  return (
    <div className="following">
      <div>
        Following
      </div>
      {props.usersFollowing.map((users, i) => {
        return (
          <span key={i}>
            <img src={users.profile_image} />
          </span>
        );
      })}
    </div>
  );
};

export default Following;
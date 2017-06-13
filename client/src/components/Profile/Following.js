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
            <a href={`/user/${users.id}`} ><img src={users.profile_image} /></a>
          </span>
        );
      })}
    </div>
  );
};

export default Following;
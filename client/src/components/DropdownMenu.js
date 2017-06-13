import React from 'react';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render() {
    if (this.props.isOpen) {
      return (
        <div className="dropdown">
          <ul>
            <li><a href={`/user/${this.props.loggedInUser.id}`}>Profile</a></li>
            { this.props.userInfo.shop_id ?
              <li><a href="/shop">Shop</a></li> 
              : <li><a href="/claimshop">Add A Shop</a></li> 
            }
            <li><a href="/logout">Log out</a></li>
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default DropdownMenu;

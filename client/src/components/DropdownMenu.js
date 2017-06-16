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
            <a href={`/user/${this.props.loggedInUser.id}`}><li>Profile</li></a>
            { this.props.userInfo.shop_id ?
              <a href={`/shop/${this.props.userInfo.shop_id}`}><li>Shop</li> </a>
              : <a href="/claimshop"><li>Add A Shop</li></a> 
            }
            <a href="/logout"><li>Log out</li></a>
          </ul>
        </div>
      );
    }
    return null;
  }
}

export default DropdownMenu;

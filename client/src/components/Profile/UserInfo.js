import React from 'react';
import axios from 'axios';


class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: this.props.userData.first,
      lastName: this.props.userData.last,
      description: this.props.userData.profile_description
    };
  }

  render() {
    let greyNotgrey;
    if (this.props.isBeingFollowed) {
      greyNotgrey = 'button-grey';
    } else {
      greyNotgrey = 'button-maroon';
    }
    return ( 
      <div className="profile_info">
        <img src={this.props.userData.profile_image} className="user_profile_image"/>
        { !this.props.editMode ?
          <div>
            <h2 className="user_name">{this.props.userData.first} {this.props.userData.last}</h2>
            <p> { this.props.userData.profile_description } </p>

            { loggedInUser.id === this.props.userData.id ?
            <div>
              <a href="#" onClick={(e) => this.props.handleEditProfile(e)}>edit</a>
              </div>
              : 
              greyNotgrey === 'button-grey' ? 
              (<button className={greyNotgrey} onClick={(e) => this.props.followUser(e, this.props.userData.id)} >Following</button>)
              :
              (<button className={greyNotgrey} onClick={(e) => this.props.followUser(e, this.props.userData.id)} >Follow</button>)
            }
          </div>
          : 
          <div className="editMode">
            <input name="firstName" type="text" value={this.state.firstName} placeholder="First name" onChange={(e) => this.setState({firstName: e.target.value})}/>
            <input name="lastName" type="text" value={this.state.lastName} placeholder="Last name" onChange={(e) => this.setState({lastName: e.target.value})}/>
            <textarea className="editBio" name="description" value={this.state.description} placeholder="Description" onChange={(e) => this.setState({description: e.target.value})}/>
            <a href="#" onClick={(e) => this.props.cancelEdit(e)}>Cancel</a><button onClick={ () => this.props.saveEdits(this.state.firstName, this.state.lastName, this.state.description)}>Save changes</button>
          </div>
        }
      </div>
    );
  }
}


export default UserInfo;
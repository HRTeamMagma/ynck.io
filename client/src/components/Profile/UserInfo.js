import React from 'react';
import axios from 'axios';


class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      description: ''
    };
  }

  render() {
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
              : null
            }
          </div>
          : 
          <div className="editMode">
            <input name="name" type="text" placeholder={`${this.props.userData.first}`} onChange={(e) => this.setState({firstName: e.target.value})}/>
            <input name="name" type="text" placeholder={`${this.props.userData.last}`} onChange={(e) => this.setState({lastName: e.target.value})}/>
            <textarea className="editBio" name="bio" placeholder={`${this.props.userData.profile_description}`} onChange={(e) => this.setState({description: e.target.value})}/>
            <a href="#" onClick={(e) => this.props.cancelEdit(e)}>Cancel</a><button onClick={ () => this.props.saveEdits(this.state.firstName, this.state.lastName, this.state.description)}>Save changes</button>
          </div>
        }
      </div>
    );
  }
}


export default UserInfo;
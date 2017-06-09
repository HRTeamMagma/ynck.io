import React from 'react';
import axios from 'axios';


class UserInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      description: '',
      editMode: false
    };
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  handleEditProfile(e) {
    e.preventDefault();
    this.setState({
      editMode: true
    });
  }

  cancelEdit(e) {
    e.preventDefault();
    this.setState({
      editMode: false
    });
  }

  render() {
    var tempHardCodedBio = 'My tattoos are my source of strength, with which I channel sasha fierce.';
    return ( 
      <div className="profile_info">
        <img src={this.props.userData.profile_image} className="user_profile_image"/>
        { !this.state.editMode ?
          <div>
            <h2 className="user_display_name">{this.props.userData.first} {this.props.userData.last}</h2>
            <p> { tempHardCodedBio } </p>

            { loggedInUser.id === this.props.userData.id ?
            <div>
              <a href="#" onClick={(e) => this.handleEditProfile(e)}>edit</a>
              </div>
              : null
            }
          </div>
          : 
          <div className="editMode">
            <input name="name" type="text" placeholder={`${this.props.userData.first}`} onChange={(e) => this.setState({firstName: e.target.value})}/>
            <input name="name" type="text" placeholder={`${this.props.userData.last}`} onChange={(e) => this.setState({lastName: e.target.value})}/>
            <textarea className="editBio" name="bio" placeholder={`${tempHardCodedBio}`} onChange={(e) => this.setState({description: e.target.value})}/>
            <a href="#" onClick={(e) => this.cancelEdit(e)}>Cancel</a><button onClick={ () => this.props.saveEdits(this.state.firstName, this.state.lastName, this.state.description)}>Save changes</button>
          </div>
        }
      </div>
    );
  }
}


export default UserInfo;
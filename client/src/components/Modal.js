import React from 'react';

class Modal extends React.Component {
  render() {
    if(!this.props.showModal) {
      return null;
    }
    
    return (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
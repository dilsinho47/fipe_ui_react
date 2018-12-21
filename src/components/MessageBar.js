import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux'
import { closeMessage } from '../actions';

const MessageTypes = ['Error', 'Warning', 'Success', 'Default'];
const lowerCaseMessageTypes = MessageTypes.map(function (value) {
  return value.toLowerCase();
});

// props: message object with {type, text}, messageTimedOut
class MessageBar extends React.Component {

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.messageTimedOut();
  };

  render() {
    if (this.props.message && this.props.message.type) {
      let type = this.props.message.type;

      var index = lowerCaseMessageTypes.indexOf(type.toLowerCase());
      if (index !== -1) {
        this.messageType = MessageTypes[index];
      } else {
        this.messageType = 'Default';
      }
    }

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.message.open && !!this.props.message.text}
          autoHideDuration={3000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.messageType}: {this.props.message.text}</span>}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
})

const mapDispatchToProps = dispatch => ({
  messageTimedOut: () => dispatch(closeMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar);
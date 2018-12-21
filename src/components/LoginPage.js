import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { addNewMessage, loginRequest, signupRequest } from '../actions';
import 'css/App.css';

// props : addNewMessage, loginRequest, signupRequest
class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      username: '',
      password: '',
    };
  }

  async onClickLogin(isLogin) {
    if (isLogin) {
      this.props.loginRequest(this.state.username, this.state.password);
    } else {
      this.props.signupRequest(this.state.username, this.state.password);
    }
  }

  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="loginPage">
        <div className="loginTitle">
          <h1>{"Car buyers & sellers guide"}</h1>
        </div>
        <div className="login">
          <fieldset>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username" autoComplete="username" autoFocus onChange={this.handleUserNameChange} value={this.state.username} />
            </FormControl>
            <br />
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Password</InputLabel>
              <Input id="password" name="password" type="password" autoComplete="current-password"
                autoFocus onChange={this.handlePasswordChange} value={this.state.password} />
            </FormControl>
            <br />
            <div className="loginButtons">
              <Button variant="contained" color="primary" onClick={() => this.onClickLogin(true)}>
                Login
              </Button>
              <Button variant="contained" color="primary" onClick={() => this.onClickLogin(false)}>
                Sign up
              </Button>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewMessage: (msg) => dispatch(addNewMessage(msg)),
  loginRequest: (username, password) => dispatch(loginRequest(username, password)),
  signupRequest: (username, password) => dispatch(signupRequest(username, password)),
})

export default connect(null, mapDispatchToProps)(LoginPage);
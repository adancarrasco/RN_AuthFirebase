import React from 'react';
import {Text} from 'react-native';
import firebase from 'firebase';

import {Card, CardSection, Button, Input, Spinner} from './common';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  handleLogin() {
    const {email, password} = this.state;

    this.setState({error: '', loading: true});

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        // The login failed with attemp to create an account with the email and password
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication failed.',
      loading: false,
    });
  }

  onLoginSuccess() {
    // 1. Clear any error messages on the screen
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
    // 2. Update loading state
    // 3. Cleanup the form
    // 4. Update the button state
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    } else {
      return <Button onPress={this.handleLogin.bind(this)}>Log In</Button>;
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

export default LoginForm;

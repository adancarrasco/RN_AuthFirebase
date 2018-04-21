import React from 'react';
import {StyleSheet, View} from 'react-native';
import firebase from 'firebase';

import {Header, Button, Spinner} from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = {
    loggedIn: null,
  };

  UNSAFE_componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyChfO_FaUGMzh9AE-D2Isn3zPYAA-eC284',
      authDomain: 'reactnativeauth-5042c.firebaseapp.com',
      databaseURL: 'https://reactnativeauth-5042c.firebaseio.com',
      projectId: 'reactnativeauth-5042c',
      storageBucket: 'reactnativeauth-5042c.appspot.com',
      messagingSenderId: '523548621617',
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerTitle={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

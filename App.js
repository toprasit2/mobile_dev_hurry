import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';
import firebase from 'react-native-firebase';
import AppNavigator from './navigation/AppNavigator';
import Login from './screens/LoginScreen';

export default class App extends Component{
  
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
  }

  /**
   * Listen for any auth state changes and update component state
   */
  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    if(this.unsubscriber)
      this.unsubscriber();
    if(this.unsubscriber2)
      this.unsubscriber2();
  }

  myLogin = (email, password) => {
    this.unsubscriber2 = firebase.auth().signInWithEmailAndPassword(email, password)
  }

  render() {
    if (!this.state.user) {
      return <Login Login={this.myLogin}/>;
    }
    // console.log(this.state.user)
    return (
      <AppNavigator user={this.state.user}/>
    );
  }
}

const styles = StyleSheet.create({
  
});

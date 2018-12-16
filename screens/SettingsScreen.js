import React from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text
} from 'react-native';
import { Button } from 'native-base';
const firestore = firebase.firestore();
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Setting',
  };

  state = {
    name: "",
    coin: 0 
  }

  subscribeToFirestore() {
    const user = firebase.auth().currentUser;
    const collection = firestore.collection('user').where("email", "==", user.email);
    this.subscription = collection.onSnapshot((snapshot) => {
      var account = snapshot.docs[0].data()
      this.setState({name:account.name, coin:account.coin})
    });
  }


  unsubscribeFromFirestore() {
    if(this.subscription)
      this.subscription();
  }

  componentDidMount(){
    this.subscribeToFirestore();
  }

  componentWillUnmount() {
     this.unsubscribeFromFirestore();
  }

  singOut(){
    console.log('singout')
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('singout')
    })
  }

  render() {
    const user = firebase.auth().currentUser;
    const { name, coin} = this.state;
    console.log(user)
    return (
      <View >
          <Text>{user.email}</Text>
          <Text>{name}</Text>
          <Text>{coin}</Text>
          <Button danger onPress={()=>this.singOut()}><Text>LOGOUT</Text></Button>
      </View>
    );
  }
}

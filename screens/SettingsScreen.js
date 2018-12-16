import React from 'react';
import firebase from 'react-native-firebase';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Button, Container, Card, Content, CardItem } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <View style={{flexDirection: 'row'}}>
                <FontAwesome name='user' size={50} />
                <View style={{paddingLeft: 20, flexDirection: 'column'}}>
                  <Text style={{fontSize: 18}}>Mail: {user.email}</Text>
                  <Text style={{fontSize: 18}}>Name: {name}</Text>
                  <Text style={{fontSize: 18}}>Coin: {coin}</Text>
                </View>
              </View>
            </CardItem>
          </Card>
            <Button danger  style = {{marginTop : 20,marginHorizontal: 150,borderRadius : 12}} onPress={()=>this.singOut()}>
              <Text style={{ paddingLeft: 25, width: 100}} >LOGOUT</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  buttonLayout: {
    flexDirection: 'row',
    textAlignVertical: 'bottom'
  }
});
import React from 'react';
import {
  StyleSheet
} from 'react-native';
  
import { View, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';
import HistoryList from './HistoryList';


const firestore = firebase.firestore();

export default class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'History',
  };
  
  state = {
    history_order: [],
  };

  subscribeToFirestore() {
    const collection = firestore.collection('user').where("email", "==", "admin@mail.com");
    var collection_key = "";
    this.subscription = collection.onSnapshot((snapshot) => {
      collection_key = snapshot.docs[0].id
      console.log(collection_key)
      const collection2 = firestore.collection('user').doc(collection_key).collection('history_order');
      this.subscription2 = collection2.onSnapshot((snapshot2) => {
        console.log("tst")
        console.log(snapshot2.docs)
        let history_order = snapshot2.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        this.setState({ history_order });
      });
    });
  }


  unsubscribeFromFirestore() {
    this.subscription();
    this.subscription2();
  }

  componentDidMount() {
    this.subscribeToFirestore();
  }

  componentWillUnmount() {
     this.unsubscribeFromFirestore();
  }

  historySelect = (status, menu, restaurant, timeC, _id) => {
    const { navigation } = this.props;
    console.log(status, menu, restaurant, timeC, _id)
    if(status == 'finish')
      navigation.navigate('QR', {status, menu, restaurant, timeC, _id});
  }

  render() {
    const { history_order } = this.state;
    return (
      <View>
      <HistoryList
        history_order={history_order}
        onHistorySelect={this.historySelect}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});



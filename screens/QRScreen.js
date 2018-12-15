import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import {
    AppRegistry,
    TouchableOpacity,
    Linking,
  } from 'react-native';
  
import QRCodeScanner from 'react-native-qrcode-scanner';
import firebase from 'react-native-firebase';
const firestore = firebase.firestore();

export default class QRScreen extends React.Component {
  static navigationOptions = {
    title: 'QR',
  };

  
  subscribeToFirestore() {
    
  }


  unsubscribeFromFirestore() {
    this.subscription();
    this.subscription2();
  }

  componentWillUnmount() {
     this.unsubscribeFromFirestore();
  }

  onSuccess(e) {
    const id = this.props.navigation.getParam("_id");
    const collection = firestore.collection('user').where("email", "==", "admin@mail.com");
    var collection_key = "";
    console.log(id)
    this.subscription = collection.onSnapshot((snapshot) => {
      collection_key = snapshot.docs[0].id
      const collection2 = firestore.collection('user').doc(collection_key).collection('history_order').doc(id);
      this.subscription2 = collection2.onSnapshot((snapshot2) => {
        console.log(snapshot2._data)
        if(snapshot2._data.restaurant == e.data)
          firestore.collection('user').doc(collection_key).collection('history_order').doc(id).set({
           ...snapshot2._data,
            status:'done'
          }).then(()=>{
            this.props.navigation.pop()
          })
      });
    });
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
    
  }
  render() {
    const status = this.props.navigation.getParam("status");
    const menu = this.props.navigation.getParam("menu");
    const restaurant = this.props.navigation.getParam("restaurant");
    const timeC = this.props.navigation.getParam("timeC");
    const id = this.props.navigation.getParam("_id");
    // console.log(id)
    return (
        <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            topContent={
            <Text style={styles.centerText}>
                Go to
            </Text>
            }
            bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>กรุณาแสกน QR code ของ {restaurant}!</Text>
            </TouchableOpacity>
            }
        />
    );
  }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
      },
      textBold: {
        fontWeight: '500',
        color: '#000',
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
      },
      buttonTouchable: {
        padding: 16,
      },
});

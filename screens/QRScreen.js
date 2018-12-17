import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import {
    TouchableOpacity
  } from 'react-native';
  
import QRCodeScanner from 'react-native-qrcode-scanner';

import firebase from 'react-native-firebase';
const firestore = firebase.firestore();

export default class QRScreen extends React.Component {
  static navigationOptions = {
    title: 'QR',
  };

  unsubscribeFromFirestore() {
    if (this.subscription)
      this.subscription();
    if(this.subscription2)
      this.subscription2();
  }

  componentWillUnmount() {
     this.unsubscribeFromFirestore();
  }

  onSuccess(e) {
    const id = this.props.navigation.getParam("_id");
    const collection = firestore.collection('user').where("email", "==", "admin@mail.com");
    var collection_key = "";
    this.subscription = collection.onSnapshot((snapshot) => {
      collection_key = snapshot.docs[0].id
      const collection2 = firestore.collection('user').doc(collection_key).collection('history_order').doc(id);
      this.subscription2 = collection2.onSnapshot((snapshot2) => {
        if(snapshot2._data.restaurant == e.data){
          firestore.collection('user').doc(collection_key).collection('history_order').doc(id).set({
           ...snapshot2._data,
            status:'.done'
          }).then(()=>{
            this.props.navigation.pop()
          })
        }
        else{
          alert('กรุณาแสกน QR code ของร้านที่ท่านสั่ง')
          this.props.navigation.pop()
        }
      });
    });
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
    
  }
  render() {
    const restaurant = this.props.navigation.getParam("restaurant");
    return (
        <QRCodeScanner
            onRead={this.onSuccess.bind(this)}
            topContent={
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
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
      },
      buttonTouchable: {
        padding: 16,
      },
});

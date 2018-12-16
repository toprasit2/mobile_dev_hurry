import React from 'react';
import {
  StyleSheet
} from 'react-native';  
import { View, Button, Text } from 'native-base';
import firebase from 'react-native-firebase';
import ListOrder from './ListOrder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const firestore = firebase.firestore();

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: 'List',
  };
  
  state = {
    list_order: [],
    sum: 0
  };

  subscribeToFirestore() {
    const collection = firestore.collection('user').where("email", "==", "admin@mail.com");
    var collection_key = "";
    this.subscription = collection.onSnapshot((snapshot) => {
      collection_key = snapshot.docs[0].id
      const collection2 = firestore.collection('user').doc(collection_key).collection('list_order');
      this.subscription2 = collection2.onSnapshot((snapshot2) => {
        let list_order = snapshot2.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        
        if(list_order){
          let sum = 0;
          list_order.map((l) => {
            sum+=l.price
          })
          this.setState({sum})
        }
        else{
          let sum = 0;
          this.setState({sum})
        }
        this.setState({ list_order });
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

  saveOrder = () => {
    const { navigation } = this.props
    const { list_order } = this.state;
    const collection = firestore.collection('user').where("email", "==", "admin@mail.com");
    var collection_key = "";
    this.subscription = collection.onSnapshot((snapshot) => {
      collection_key = snapshot.docs[0].id
      list_order.map((l)=>{
        firestore.collection('user').doc(collection_key).collection('history_order').doc(l._id).set({
          ...l,
          dateTime: firebase.firestore.FieldValue.serverTimestamp(),
          status:'cooking'
        })
        firestore.collection('user').doc(collection_key).collection('list_order').doc(l._id).delete()
      })
      let sum = 0;
      this.setState({sum})
      const { navigation } = this.props
      navigation.navigate('History')
      
      
    });
  }
 

  render() {
    const { list_order } = this.state;
    const { sum } = this.state;

    return (
      <View style={{flex:1, flexDirection: 'column'}}>
        <ListOrder
          list_order={ list_order }
          onListSelect={this.listSelect}
        />
        <View> 
            <Button block style={{backgroundColor:'white'}} onPress={()=>{this.props.navigation.navigate('Menu')}}>
              <FontAwesome name={"plus"} size={25}></FontAwesome>
            </Button>
        </View>
        <View style = {styles.buttonLayout}>
          <Text style={{flex:1, fontSize:30}}>รวม : {sum} บาท</Text>
          <Button block success style={{flex:1}} onPress={this.saveOrder}>
            <Text> ยืนยัน </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonLayout: {
    flexDirection: 'row',
    textAlignVertical: 'bottom'
  }
});
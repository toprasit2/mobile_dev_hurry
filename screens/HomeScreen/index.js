import React from 'react';  //%LOCALAPPDATA%\Android\Sdk\platform-tools\adb reverse tcp:8081 tcp:8081
import {
  StyleSheet,
  View,
  Text,
  Image,
  Content,
  Button
} from 'react-native';
import {Item, Input, Container, Icon} from 'native-base';
import firebase from 'react-native-firebase'

const firestore = firebase.firestore();

import ShopList from './ShopList';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
      shopList:[],
  };

  subscribeToFirestore() {
    const collection = firestore.collection('restaurant');
    this.subscription = collection.onSnapshot((snapshot) => {
        this.updateState(snapshot.docs);
    });
}

    updateState(docs) {
    const shopList = docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    }));

    this.setState({ shopList });
    }
    unsubscribeFromFirestore() {
        this.subscription();
    }

    componentDidMount() {
        this.subscribeToFirestore();
    }

    componentWillUnmount() {
        this.unsubscribeFromFirestore();
    }


  render() {
    const {shopList} = this.state;
    return (
        <Container>
        <View >
            <Item >
                <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/mobile-mai-tong-ror.appspot.com/o/dorm-57.jpg?alt=media&token=bebe82e7-4892-4737-83ae-49c55c2c1362'}}
       style={{width:400 , height: 140}} />
            </Item>
        </View>
       
        
        
        <ShopList shopList={ shopList }/>
        
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
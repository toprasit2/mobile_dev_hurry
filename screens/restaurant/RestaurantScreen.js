import React from 'react';
import RestaurantList from './RestaurantList';
import firebase from 'react-native-firebase';
import {View, Image, Text} from 'react-native';
import {Item, Input, Container, Icon, Card, CardItem, Body} from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const firestore = firebase.firestore();

class RestaurantScreen extends React.Component {

  static navigationOptions = {
    title: 'Restaurant',
  };

  state = {
    restaurantList: [],
  };

  subscribeToFirestore() {
    const collection = firestore.collection('restaurant');
    this.subscription = collection.onSnapshot((snapshot) => {
        this.updateState(snapshot.docs);
    });
  }

  updateState(docs) {
    const restaurantList = docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    }));

    this.setState({ restaurantList });
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

  handleRestaurantSelected = (nameRes) => {
    const { navigation } = this.props;
    const menuId = navigation.getParam('menuId');
    const name = navigation.getParam('name');
    const meat = navigation.getParam('meat');

    navigation.navigate('Order', { menuId: menuId, name: name, meat: meat, nameRes: nameRes})
  }


  render() {
    const { restaurantList } = this.state;
    const { navigation } = this.props;
    const meat = navigation.getParam('meat');
    const pic = navigation.getParam('pic');
    const name = navigation.getParam('name');

    return(
      <Container>
        <Card>
          <CardItem>
            <Body>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image source={{uri: pic }} style={{width: 96, height: 96, borderRadius: 64}} />
                </View>
                <View style={{paddingLeft: 10, flexDirection:'column'}}>
                  <Text style={{fontSize: 18, flex:1}}>{name}{meat}</Text>
                  <Item rounded style={{flex:1, width:250, padding:10}}>
                    <Input placeholder= 'ค้นหาร้านอาหาร'/>
                    <FontAwesome name={"search"} size={25}></FontAwesome>
                  </Item>
                </View>
              </View>
            </Body>
          </CardItem>
        </Card>
        <RestaurantList restaurantList={ restaurantList } 
         onRestaurantSelected={ this.handleRestaurantSelected } />
      </Container>
    )
  }
}

export default RestaurantScreen;
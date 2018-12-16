import React from 'react';
import { Card, CardItem, Body ,Icon,Right,Left} from 'native-base';
import { View, Image, Text, Animated } from 'react-native';
import firebase from 'react-native-firebase';
const firestore = firebase.firestore();
class ShopEntry extends React.Component {
  state = {
    menuList: [],
  };

  subscribeToFirestore() {
    const { shop } = this.props;
    const {
      id,
      name,
      pic,
      type,
    } = shop;
    const collection = firestore.collection('restaurant').doc(id).collection('menus');
    this.subscription = collection.onSnapshot((snapshot) => {
      console.log(snapshot.docs)
      this.setState({menuList:snapshot.docs})
    });
  }


  unsubscribeFromFirestore() {
    if(this.subscription)
      this.subscription();
  }

  componentDidMount() {
    this.subscribeToFirestore();
  }

  componentWillUnmount() {
     this.unsubscribeFromFirestore();
  }

  render() {
    const { shop } = this.props;
    const {
      id,
      name,
      pic,
      type,
    } = shop;
    const {menuList} = this.state
    console.log(menuList)
    return (
        <Card>
          <CardItem>
            <Body>
              <View style={{flexDirection: 'row'}}>
                <Left>
                  <Image source={{uri: pic }} style={{width: 96, height: 96}} />
                </Left>
                
                <View style={{paddingLeft: 10 }}>
                  <Text style={{fontSize: 20}}>{name}</Text>
                  <Text style={{fontSize: 14}}>{type}</Text>
                </View>

                <Right>
                  <Icon active name="thumbs-up" />
                </Right>
                
                
              </View>
              <View>
                {
                  menuList?
                  menuList.map((m)=>(
                    <Text key={m.id}>{m.data().name} {m.data().pic}</Text>
                  )):
                  null
                }
              </View>
            </Body>
          </CardItem>    
        </Card>
    );
  }
}

export default ShopEntry;
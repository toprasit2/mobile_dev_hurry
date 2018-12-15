import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Card, CardItem, Body,  } from 'native-base';
import firebase from 'react-native-firebase'; 

const firestore = firebase.firestore();


export default class OrderScreen extends React.Component {
  static navigationOptions = {
    title: 'Order',
  };

  state = {
      menuList: [],
  };

  subscribeToFirestore() {
      const collection = firestore.collection('menu');
      this.subscription = collection.onSnapshot((snapshot) => {
        console.log(snapshot.docs)
        this.updateState(snapshot.docs);
      });
  }

  updateState(docs) {
      const menuList = docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));

      this.setState({ menuList });
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
      const { menuList } = this.state;
      const {
          name,
          pic,
          price,
      } = menuList;
      return(
          <Container>
              <Content>
                  <View style={{padding: 15}}>
                      <Item rounded>
                          <Input placeholder='ค้นหาเมนู' />
                          <Icon android='md-search' />
                      </Item>
                  </View>
                  <Card>
                      <CardItem>
                          <Body>
                              <View style={{flexDirection: 'row'}}>
                                  <View>
                                      <Image source={{uri: 'https://food.mthai.com/app/uploads/2017/09/basil.jpg'}} 
                                          style={{width: 96, height: 96, borderRadius: 64}}
                                      />
                                  </View>
                                  <View style={{paddingLeft: 10}}>
                                      <Text style={{fontSize: 18}}>{name}</Text>
                                  </View>
                                  <View style={{paddingLeft: 40}}>
                                      <Text style={{fontSize: 18}}>{price}</Text>
                                  </View>
                              </View>
                          </Body>
                      </CardItem>
                  </Card>
              </Content>
          </Container>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

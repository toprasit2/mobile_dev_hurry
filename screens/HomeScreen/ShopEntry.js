import React from 'react';
import { Card, CardItem, Body ,Icon,Right,Left,Button} from 'native-base';
import { View, Image, Text, Animated } from 'react-native';
import firebase from 'react-native-firebase';
import { ScrollView } from 'react-native-gesture-handler';
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
      
        <Card key={shop.id}>
          <CardItem header bordered>
             <View style={{flexDirection: 'row'}}>
                <Left>
                  <Image source={{uri: pic }} style={{width: 76, height: 76}} />
                </Left>
                <Body>
                <View style={{paddingLeft: 5 }}>
                  <Text style={{fontSize: 20}}>{name}</Text>
                  <Text style={{fontSize: 14}}>{type}</Text>
                </View>
                </Body> 
               <Right>
                <Button transparent>
              <Icon name="heart" />
            </Button>
                </Right>
             
             </View>   
          </CardItem>     
  
          <CardItem bordered>  
              <ScrollView horizontal={true}>
                {
                  menuList?
                  menuList.map((m)=>(
                    <View style={{width:130, alignItems:'center'}}>
                    <Image key={m.id} source={{uri: m.data().pic }} style={{width: 65, height: 60,borderRadius: 14}} />
                    
                    <Text key={m.id} > {m.data().name} </Text> 
                    </View>
                    
                     )):
                  
                  null
                }
              </ScrollView>

            
          </CardItem>    
        </Card>
    );
  }
}

export default ShopEntry;
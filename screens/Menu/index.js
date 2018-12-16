import React from 'react';

import MenuList from './MenuList';

import firebase from 'react-native-firebase'; 
import {View} from 'react-native';
import {Item, Input, Container, Icon} from 'native-base';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const firestore = firebase.firestore();

class Menu extends React.Component{

    state = {
       menuList: [],
    };

    subscribeToFirestore() {
        const collection = firestore.collection('menu');
        this.subscription = collection.onSnapshot((snapshot) => {
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

    handleMeatSelected = (id, name, pic, each) => {
        const { navigation } = this.props;
        navigation.navigate('Restaurant', {menuId: id, name: name, pic: pic, meat: each});
      }
    

    render() {
        const {menuList} = this.state;
        return(
            <Container>
                <View style={{padding: 15}}>
                    <Item rounded style={{padding: 10}}>
                        <Input placeholder='ค้นหาเมนู' />
                        <FontAwesome name={"search"} size={25}></FontAwesome>
                    </Item>
                </View>
                <MenuList menuList={ menuList }
                onMenuSelected={ this.handleMeatSelected } />
            </Container>
        )
    }

}

export default Menu;
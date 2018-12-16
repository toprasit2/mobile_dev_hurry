import React from 'react';
import { Card, CardItem, Body } from 'native-base';
import { View, Image, Text } from 'react-native';
import Meat from './Meat/Meat'; 

class MenuEntry extends React.Component {

  handlePressed = (each) => {
    const { onPressed, menu } = this.props;
    const {
      id,
      name,
      pic,
    } = menu;
    if (typeof onPressed === 'function')
      onPressed(id, name, pic, each);
  }
  
  render() {
    const { menu } = this.props;
    const {
      id,
      name,
      pic,
      price,
    } = menu;

    return (
        <Card key={menu.id}>
          <CardItem>
            <Body>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Image source={{uri: pic }} style={{width: 96, height: 96, borderRadius: 64}} />
                </View>
                <View style={{paddingLeft: 10}}>
                  <Text style={{fontSize: 18}}>{name}</Text>
                </View>
                <View style={{paddingLeft: 40}}>
                  <Text style={{fontSize: 18}}>{price}</Text>
                </View>
              </View>
              <Meat id={id} handleMeatSelected={this.handlePressed} />
            </Body>  
          </CardItem>
        </Card>
    );
  }
}

export default MenuEntry;
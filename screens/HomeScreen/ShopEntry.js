import React from 'react';
import { Card, CardItem, Body ,Icon,Right,Left} from 'native-base';
import { View, Image, Text, Animated } from 'react-native';

class ShopEntry extends React.Component {
  

  render() {
    const { shop } = this.props;
    const {
      id,
      name,
      pic,
      type,
    } = shop;

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
            </Body>
          </CardItem>    
        </Card>
    );
  }
}

export default ShopEntry;
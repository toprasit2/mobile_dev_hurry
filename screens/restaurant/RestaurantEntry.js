import React from 'react';
import { Card, CardItem, Body } from 'native-base';
import { View, Image, Text } from 'react-native';

class RestaurantEntry extends React.Component {

  render() {
    const { restaurant } = this.props;
    const {
      id,
      name,
      pic,
      status,
      type,
    } = restaurant;

    return (
        <Card>
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
                  <Text style={{fontSize: 18}}>{status}</Text>
                </View>
              </View>
            </Body>
          </CardItem>
        </Card>
    );
  }
}

export default RestaurantEntry;
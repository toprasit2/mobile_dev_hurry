import React from 'react';

import {
  View,
  Text
} from 'react-native';

export default class FavouriteScreen extends React.Component {
  static navigationOptions = {
    title: 'Favourite',
  };

  render() {
    return (
      <View >
          <Text>Favourite Screen</Text>
      </View>
    );
  }
}

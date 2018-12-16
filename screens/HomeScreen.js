import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { Button } from 'native-base';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  
  render() {
    return (
      <View style={styles.container}>
          <Text>Home screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

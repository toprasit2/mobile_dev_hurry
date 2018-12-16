import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text
} from 'react-native';
import { Button } from 'native-base';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
        email: 'admin@mail.com', 
        password: 'password'
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput
            style={{height: 40}}
            placeholder="Email :"
            onChangeText={(email) => this.setState({email})}
            />
            <TextInput
            style={{height: 40}}
            placeholder="Password :"
            onChangeText={(password) => this.setState({password})}
            />
            <Button onPress={this.props.Login(this.state.email, this.state.password)}><Text>Login</Text></Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
});

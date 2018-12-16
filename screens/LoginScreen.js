import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';

import { Container, Header, Content, Card, CardItem, Text, Body,Button } from 'native-base';

export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
        email: '', 
        password: ''
    };
  }

  render() {
    return (
      <Container>
    <View style={{flexDirection: 'row'}}>
                <Body>
                <Image source={
                  {uri: 'https://firebasestorage.googleapis.com/v0/b/mobile-mai-tong-ror.appspot.com/o/LOGO.png?alt=media&token=7e5051f0-889b-4eef-9048-aedde2aad04b' }} style={{width: 300, height: 100}} />
                </Body>
                </View>

    <Card>

      <CardItem header bordered>
      
         <Text>Please Login to your account .</Text>
        
      </CardItem>
      
      <CardItem bordered>
        <View style={styles.container}>
          <TextInput
            style={{height: 40}}
            placeholder="Email"
            onChangeText={(email) => this.setState({email})}
            />
            </View>
      </CardItem>
      <CardItem bordered>
      <View style={styles.container}>
            <TextInput
            style={{height: 40}}
            placeholder="Password"
            secureTextEntry 
            onChangeText={(password) => this.setState({password})}
            />
        </View>
      </CardItem>
      

      <Button   style = {{marginTop :20,borderRadius: 12}} onPress={()=>this.props.Login(this.state.email, this.state.password)}>
            <Text >Log in </Text>
        </Button>
      </Card>
  </Container>
        
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
});
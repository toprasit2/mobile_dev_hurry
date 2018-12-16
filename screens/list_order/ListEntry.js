import React from 'react';
import {
  Components,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Button } from 'native-base';
import moment from 'moment';

class RestText extends React.Component {
  render(){
    return(
      <View>
        <Text style = {{fontSize: 20, textAlign: 'left', fontWeight: 'bold'}}> {this.props.rname}</Text>
      </View>
    )
  }
}

class ReserveTime extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hours: moment().format('h'),
      minutes: moment().format('mm')
    }
  }

  render(){
    return(
      <View>
        <Text style = {{fontWeight: 'bold', color: 'red', fontSize: 20}}>
            {this.state.hours} : {this.state.minutes} {'\n'}
          </Text>
      </View>
    )
  }
}

class OrderList extends React.Component{
  render(){
    return(
      <View>
        <Text style = {{fontSize: 16, textAlign: 'left', lineHeight: 15}}> {this.props.menuname}{'\n'} </Text>
      </View>
    );
  }
}

class TotalPrice extends React.Component {
  render() {
      return(
          <View>             
              <Text style = {{fontSize: 20, color: 'red'}}> {this.props.price} </Text> 
          </View>
      );
  }
}

export default class ListEntry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hours: moment().format('h'),
      minutes: moment().format('mm')
    }
  } 

  handlePressed = () => {
    const { onPressed, list_order } = this.props;
    const {
        detail, menu, optionEgg, optionFood, price, restaurant, timeC, unit, _id
    } = list_order;
    
    if (typeof onPressed === 'function')
      onPressed(detail, menu, optionEgg, optionFood, price, restaurant, timeC, unit, _id);
  }

  render() {
    const { list_order } = this.props;
    const {
        dateTime, detail, menu, optionEgg, optionFood, price, restaurant, timeC, unit, _id
    } = list_order;
    
    if(dateTime != undefined)
      console.log(list_order)
    return (
      <TouchableHighlight
        onPress={this.handlePressed}
        style={styles.touchable}
      >
        <View style = {styles.box}>
            <View style = {{height: 130, backgroundColor: 'lightgrey'}}>
              <View style = {styles.resttext}>
                <RestText rname = { restaurant } />
                <ReserveTime />
              </View>
              <View style = {styles.orderlist}>
                <OrderList menuname = { menu } />
              </View>
              <View style = {styles.price}>
                <Text style = {{fontSize: 20}}> ราคา{'\t'} </Text>             
                <TotalPrice price = { price } />
                <Text style = {{fontSize: 20}}> {'\t'}บาท </Text>
              </View>
            </View>           
        </View>  
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  menu: {
    fontWeight: 'bold',
    fontSize: 16
  },
  restaurant: {
    paddingBottom: 5,
    fontSize: 20,
    fontWeight: 'normal'
  },
  box: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  resttext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  orderlist: {
    flexDirection: 'column',
    paddingHorizontal: 30,
    justifyContent: 'space-evenly'
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlignVertical: 'bottom',
    paddingBottom: 15,
    paddingHorizontal: 10
  }
});

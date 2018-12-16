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

class AddOption extends React.Component {
  constructor(props){
    super(props);
  }
  getOption = (op) => {
    if(op != null)
      return { fontSize: 16, textAlign: 'center' };
  }

  render() {
    return(
      <View>
      <Text style = {this.getOption(this.props.op)}>
        { this.props.op }
      </Text>
    </View>
    );  
  }
}

class PlusSpecial extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        textSpecial: ''
      }
  }
  getOption = (spe) => {
    if(spe == true){
      this.state.textSpecial = 'พิเศษ';
      return { fontSize: 16, textAlign: 'center' };
    }
    else {
      this.state.textSpecial = 'ปกติ';
      return { fontSize: 16, textAlign: 'center' };
    }
  }

  render() {
    return(
      <View>
      <Text style = {this.getOption(this.props.spe)}>
        { this.state.textSpecial }
      </Text>
    </View>
    );  
  }
}

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
  }

  render(){
    return(
      <View>
        <Text style = {{fontWeight: 'bold', color: 'red', fontSize: 20}}>
            {this.props.time}
          </Text>
      </View>
    )
  }
}

class OrderList extends React.Component{
  render(){
    return(
      <View>
        <Text style = {{fontSize: 16, textAlign: 'left'}}>
          {this.props.menuname}{'\n'}
        </Text>
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
        dateTime, detail, menu, optionEgg, optionFood, price, restaurant, timeC, unit, _id, ware
    } = list_order;
    
    if(dateTime != undefined)
      console.log(list_order)
    return (
      <TouchableHighlight
        onPress={this.handlePressed}
        style={styles.touchable}
      >
        <View style = {styles.box}>
            <View style = {{flex: 1, backgroundColor: 'lightgrey'}}>
              <View style = {styles.resttext}>
                <RestText rname = { restaurant } />
                <ReserveTime time={timeC}/>
              </View>
              <View style = {styles.detailZone}>
                <View style = {styles.orderlist}>
                  <OrderList menuname = { menu } />
                </View>
                <View style = {styles.optionDetail}>
                  {
                    optionEgg?
                    (
                      <View style = {styles.optionBox}>
                        <AddOption op = { optionEgg } />
                      </View>
                    ):
                    null
                  }
                  
                  <View style = {styles.speBox}>
                    <PlusSpecial spe = { optionFood } />
                  </View>
                </View>
              </View>
            <View style = {styles.detailZone}>
              <View><Text style = {{fontSize: 20, textAlign: 'left'}}>{unit +""} {ware}</Text></View>
              <View style = {styles.price}>
                <Text style = {{fontSize: 20}}> ราคา{'\t'} </Text>             
                  <TotalPrice price = { price } />
                <Text style = {{fontSize: 20}}> {'\t'}บาท </Text>
              </View>
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
    paddingHorizontal: 4,
    paddingTop: 4
  },
  orderlist: {
    flexDirection: 'column',
    paddingHorizontal: 25,
    justifyContent: 'space-evenly'
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlignVertical: 'bottom',
    paddingBottom: 4,
    paddingHorizontal: 4
  },
  optionDetail: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingHorizontal: 25
  },
  detailZone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionBox: {
    height: 32,
    width: 64,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 3
  },
  speBox: {
    height: 32,
    width: 64,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1
  }
});


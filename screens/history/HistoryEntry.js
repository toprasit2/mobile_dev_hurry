import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Button, Card } from 'native-base';
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
  }

  getTextStyle = (status) => {
    if(status == 'finish') {
      return {fontWeight: 'bold', color: 'red', fontSize: 20}
    }
    else if(status == '.done'){
      return {fontWeight: 'bold', color: 'grey', fontSize: 20}
    }
    else {
      return {fontWeight: 'bold', color: 'red', fontSize: 20}
    }
  }

  render(){
    return(
      <View>
        <Text style = {this.getTextStyle(this.props.status)}>
          {this.props.time != undefined ? this.props.time.toTimeString().split(" ")[0]: ''}
          {'\n'}
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

class OrderStatus extends React.Component {
  getTextStyle = (status) => {
    if(status == 'finish') {
      return {fontSize: 20, textAlign: 'left', fontWeight: 'bold', color: 'red'}
    }
    else if(status == '.done'){
      return {fontSize: 20, textAlign: 'left', fontWeight: 'bold', color: 'grey'}
    }
    else {
      return {fontSize: 20, textAlign: 'left', fontWeight: 'bold', color: 'red'}
    }
  }
  render(){
    return(
      <View>
        <Text style = {this.getTextStyle(this.props.ordersta)}> Status: {this.props.ordersta} </Text>
      </View>
    );
  }
}

class CntTime extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  render(){
    return(
      <View>
        <View style = {{height: 24, width: 72, backgroundColor: 'black'}}>
          <Text style = {{fontSize: 16, color: 'white', textAlign: 'center'}}>
            {this.state.hours} : {this.state.minutes} : {this.state.seconds}
          </Text>
        </View>
      </View>
    )
  }
}


export default class HistoryEntry extends React.Component {
  handlePressed = () => {
    const { onPressed, history_order } = this.props;
    const {
      menu,
      restaurant,
      timeC,
      status,
      _id
    } = history_order;
    
    if (typeof onPressed === 'function')
      onPressed(status, menu, restaurant, timeC, _id);
  }

  getContainerStyle = (status) => {
    if(status == 'finish') {
      return {
        backgroundColor: 'lightgreen',
        height: 160
      }
    }
    else if(status == '.done'){
      return {
        backgroundColor: 'lightgrey',
        height: 160
      }
    }
    else {
      return {
        height: 160,
        backgroundColor: 'white',
      }
    }
  }

  render() {
    const { history_order } = this.props;
    const {
      menu,
      restaurant,
      timeC,
      status,
      dateTime,
      id
    } = history_order;
    if(dateTime != undefined)
      console.log(history_order)
    return (
      <TouchableHighlight
        onPress={this.handlePressed}
        style={styles.touchable}
      >
      <Card>
        <View style = {styles.box}>
            <View style = {this.getContainerStyle(status)}>
                  <View style = {styles.resttext}>
                    <RestText rname = {restaurant} />
                    <ReserveTime time={dateTime} status={status}/>
                  </View>
                  <View style = {styles.orderlist}>
                    <OrderList menuname = {menu} />
                  </View>
                  <View style = {styles.orderstatus}>
                    <OrderStatus ordersta = {status} />
                    <CntTime />
                  </View>
            </View>
        </View>
      </Card>  
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
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
  },
  container_finish: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'gray',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  menu: {
    fontWeight: 'bold',
  },
  restaurant: {
    fontWeight: 'normal',
  },
  box: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  resttext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  orderlist: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  orderstatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'bottom',
    paddingBottom: 10,
    paddingHorizontal: 10
  }
});


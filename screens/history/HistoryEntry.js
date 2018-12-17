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
          {this.props.time != undefined ? this.props.time: ''}
        </Text>
      </View>
    )
  }
}

class OrderList extends React.Component{
  render(){
    return(
      <View>
        <Text style = {{fontSize: 16, textAlign: 'left'}}> {this.props.menuname}{'\n'} </Text>
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
      hours: "00",
      minutes: "00",
      seconds: "00"
    }
  }

  change(){
    
    setInterval(
      ()=>{
        var que = this.props.que
        var timeC = this.props.timeC
        var timeH = Number(timeC.split('-')[0].split('.')[0])
        var timeM = Number(timeC.split('-')[0].split('.')[1])
        
        var n_hours = moment.utc().hours()
        var n_minutes = moment.utc().minutes()
        var n_seconds = moment.utc().seconds()
        if(n_hours>=17)
          n_hours-=17;
        else
          n_hours+=7;
        n_hours = timeH-n_hours;
        if(timeM==0){
          timeM =timeM+(2*que)+2;
          n_minutes = timeM-n_minutes+59;
          n_hours = n_hours-1
        }
        else{
          timeM =timeM+(2*que)+2;
          if(timeM>n_minutes)
            n_minutes = timeM-n_minutes;
          else
            n_minutes = timeM-n_minutes+30;
        }
        n_seconds =60-n_seconds;
  
        if(n_hours<=0){
          n_hours = 0;
          n_minutes = 0;
          n_seconds = 0;
        }
        var s_hours = ""
        var s_minutes = ""
        var s_seconds = ""
        if (n_hours<10)
          s_hours = "0" + n_hours
        else
          s_hours = "" + n_hours
        if (n_minutes<10)
          s_minutes = "0" + n_minutes
        else
          s_minutes = ""+n_minutes
        if (n_seconds<10)
          s_seconds = "0" + n_seconds
        else
          s_seconds = ""+n_seconds
        
        this.setState({
          hours:s_hours,
          minutes:s_minutes,
          seconds:s_seconds
        })
      },1000)
    
  }

  componentDidMount(){
    this.change()
  }
  render(){
    return(
      <View>
        <View style = {{height: 24, width: 120, backgroundColor: 'black'}}>
          <Text style = {{fontSize: 16, color: 'white', textAlign: 'center'}}>
            {this.state.hours} : {this.state.minutes} : {this.state.seconds}
          </Text>
        </View>
      </View>
    )
  }
}

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
        flex: 1
      }
    }
    else if(status == '.done'){
      return {
        backgroundColor: 'lightgrey',
        flex: 1
      }
    }
    else {
      return {
        flex: 1
      }
    }
  }

  render() {
    const { history_order } = this.props;
    const {
      dateTime, detail, menu, optionEgg, optionFood, price, status, restaurant, timeC, unit, _id, que
    } = history_order;
    if(dateTime != undefined)
      console.log(history_order)
    return (
      <TouchableHighlight
        onPress={this.handlePressed}
        style={styles.touchable}
      >
        <Card>
            <View style = {this.getContainerStyle(status)}>
                  <View style = {styles.resttext}>
                    <RestText rname = {restaurant} />
                    <ReserveTime time={timeC} status={status}/>
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
                    <View></View>
                  }                  
                  <View style = {styles.speBox}>
                    <PlusSpecial spe = { optionFood } />
                  </View>
                </View>
              </View>
                  <View style = {styles.orderstatus}>
                    <OrderStatus ordersta = {status} />
                    <CntTime que={que} timeC={timeC}/>     
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
    borderWidth: 1,
    paddingVertical: 3
  },
  orderstatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlignVertical: 'bottom',
    paddingBottom: 4,
    paddingHorizontal: 4,
    paddingTop: 4
  }
});


import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base'; 

class MeatEntry extends React.Component {
  
  handlePressed = (each) => {
    const { onPressed } = this.props;
    if (typeof onPressed === 'function')
      onPressed(each);
  }

  render() {
    const { meat } = this.props;
    const {
      each,
      icon,
    } = meat;

    return (
      <View style={{flexDirection: 'row'}}>
        {each.map(r => 
          <View style={{flexDirection: 'row', padding: 5, paddingTop: 10}}>
            <Button light rounded onPress={()=>this.handlePressed(r)}>
              <View style={{width: 72, height: 48, alignItems: 'center', justifyContent: 'center'}}>
                <Text>{r}</Text>
              </View>
            </Button>
          </View>
        )}  
      </View>
    )
  }
}

export default MeatEntry;  
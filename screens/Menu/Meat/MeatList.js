import React from 'react';
import { FlatList } from 'react-native';
import MeatEntry from './MeatEntry';


class MeatList extends React.Component {

  handleMeatSelected = (each) => {
    const { onMeatSelected } = this.props;

    if (typeof onMeatSelected === 'function')
      onMeatSelected(each);
  };

  renderItem = ({item}) => (
    <MeatEntry meat={item}
    onPressed={this.handleMeatSelected} />
  );

  keyExtractor = (item) => item._id;

  render() {
    const {meatList} = this.props;

    return (
      <FlatList 
        data={ meatList }
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default MeatList;
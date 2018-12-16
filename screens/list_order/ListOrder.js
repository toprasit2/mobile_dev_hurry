import React from 'react';
import {
  FlatList,
} from 'react-native';
import ListEntry from './ListEntry';

class ListOrder extends React.Component {
  ListSelect = (detail, menu, optionEgg, optionFood, price, restaurant, timeC, unit, _id) => {
    const { onListSelect } = this.props;

    if (typeof onHistorySelect === 'function')
        onListSelect(detail, menu, optionEgg, optionFood, price, restaurant, timeC, unit, _id);
  };

  renderItem = ({item}) => (
    <ListEntry
      list_order={item}
      onPressed={this.ListSelect}
    />
  );

  keyExtractor = (item) => item._id;

  render() {
    const { list_order } = this.props;
    
    return (
      <FlatList
        data={list_order}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default ListOrder;
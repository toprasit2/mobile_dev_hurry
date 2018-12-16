import React from 'react';
import { FlatList } from 'react-native';
import RestaurantEntry from './RestaurantEntry';

class RestaurantList extends React.Component {
  renderItem = ({item}) => (
    <RestaurantEntry
      restaurant={item}
    />
  );

  keyExtractor = (item) => item._id;

  render() {
    const { restaurantList } = this.props;

    return (
      <FlatList
        data={ restaurantList }
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default RestaurantList;
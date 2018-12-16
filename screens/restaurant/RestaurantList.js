import React from 'react';
import { FlatList } from 'react-native';
import RestaurantEntry from './RestaurantEntry';

class RestaurantList extends React.Component {
  handleRestaurantSelect = (nameRes) => {
    const { onRestaurantSelected } = this.props;

    if(typeof onRestaurantSelected === 'function')
      onRestaurantSelected(nameRes);
  };

  renderItem = ({item}) => (
    <RestaurantEntry
      restaurant={item}
      onPressed={ this.handleRestaurantSelect }
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
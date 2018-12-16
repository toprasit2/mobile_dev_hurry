import React from 'react';
import {
  FlatList,
} from 'react-native';

import ShopEntry from './ShopEntry';

class ShopList extends React.Component {
    renderItem = ({item}) => (
        <ShopEntry
          shop={item}
        />
      );

keyExtractor = (item) => item._id;

render() {
    const { shopList } = this.props;

    return (
      <FlatList
        data={ shopList }
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }

}

export default ShopList;
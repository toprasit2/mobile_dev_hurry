import React from 'react';
import {
  FlatList,
} from 'react-native';

import MenuEntry from './MenuEntry';

class MenuList extends React.Component {

  handleMenuSelected = (id, name, each, pic) => {
    const { onMenuSelected } = this.props;

    if (typeof onMenuSelected === 'function')
      onMenuSelected(id, name, each, pic);
  };

  renderItem = ({item}) => (
    <MenuEntry
      menu={item}
      onPressed={this.handleMenuSelected}
    />
  );

  keyExtractor = (item) => item._id;

  render() {
    const { menuList } = this.props;

    return (
      <FlatList
        data={ menuList }
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default MenuList;
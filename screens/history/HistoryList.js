import React from 'react';
import {
  FlatList,
} from 'react-native';

import HistoryEntry from './HistoryEntry';

class HistoryList extends React.Component {
  historySelect = (status, menu, restaurant, timeC, _id) => {
    const { onHistorySelect } = this.props;

    if (typeof onHistorySelect === 'function')
        onHistorySelect(status, menu, restaurant, timeC, _id);
  };

  renderItem = ({item}) => (
    <HistoryEntry
      history_order={item}
      onPressed={this.historySelect}
    />
  );

  keyExtractor = (item) => item._id;

  render() {
    const { history_order } = this.props;
    
    return (
      <FlatList
        data={history_order}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default HistoryList;
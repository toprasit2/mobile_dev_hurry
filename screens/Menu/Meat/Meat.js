import React from 'react';

import firebase from 'react-native-firebase';
import MeatList from './MeatList';

const firestore = firebase.firestore();

class Meat extends React.Component {

  state = {
    meatList: [],
  };
  subscribeToFirestore() {
    const {id} = this.props;
    const collection = firestore.collection('menu').doc(id).collection('meat');
    this.subscription = collection.onSnapshot((snapshot) => {
        this.updateState(snapshot.docs);
      });
  }

  updateState(docs) {
      const meatList = docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
      }));

      this.setState({ meatList });
  }

  unsubscribeFromFirestore() {
      this.subscription();
  }

  componentDidMount() {
      this.subscribeToFirestore();
  }

  componentWillUnmount() {
      this.unsubscribeFromFirestore();
  }

  handleMeatSelected = (each) => {
    const { handleMeatSelected } = this.props;
    if (typeof handleMeatSelected === 'function')
      handleMeatSelected(each);
  }


  render() {
    const {meatList} = this.state;

    return (
      <MeatList meatList={ meatList } 
      onMeatSelected={this.handleMeatSelected} />
    );
  }

}

export default Meat; 
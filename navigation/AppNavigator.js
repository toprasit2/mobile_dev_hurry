import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen/index';

import OrderScreen from '../screens/OrderScreen';
import ListScreen from '../screens/list_order/ListScreen';
import MenuScreen from '../screens/Menu/index';
import RestaurantScreen from '../screens/restaurant/RestaurantScreen';

import SettingsScreen from '../screens/SettingsScreen';

import HistoryScreen from '../screens/history/HistoryScreen';

import FavouriteScreen from '../screens/FavouriteScreen';

import QRScreen from '../screens/QRScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const OrderStack = createStackNavigator({
  ListOrder: ListScreen,
  Menu: MenuScreen,
  Restaurant: RestaurantScreen,
  Order: OrderScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const HistoryStack = createStackNavigator({
  History: HistoryScreen,
  QR: QRScreen,
});

const FavouriteStack = createStackNavigator({
  Favourite: FavouriteScreen,
});


export default createAppContainer(createBottomTabNavigator(
  {
    History : HistoryStack, 
    Order : OrderStack,
    Home : HomeStack,
    Favourite : FavouriteStack,
    Settings : SettingsStack
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `${focused ? 'home' : 'home'}`;
        } 
        else if (routeName === 'Settings') {
          iconName = `${focused ? 'user-circle' : 'user-circle'}`;
        }
        else if (routeName === 'Favourite') {
          iconName = `${focused ? 'star' : 'star'}`;
        }
        else if (routeName === 'History') {
          iconName = `${focused ? 'history' : 'history'}`; 
        }
        else if (routeName === 'Order') {
          iconName = `${focused ? 'reorder' : 'reorder'}`; 
        }
        // icon component from react-native-vector-icons
        return <FontAwesome name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));

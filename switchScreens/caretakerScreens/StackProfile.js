import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditProfile from './StackProfileScreens/EditProfile';
import Remainder from './StackProfileScreens/Remainder';
import Notes from './StackProfileScreens/Notes';
import Profile from './StackProfileScreens/Profile';

const StackProfile = createStackNavigator(
  {
    MainProfile: {
      screen: Profile,
    },
    EditProfile: {
      screen: EditProfile,
    },
    Remainder: {
      screen: Remainder,
    },
    Notes: {
      screen: Notes,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(StackProfile);

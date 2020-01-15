import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

import LoginScreen from './LoginScreen';
import LoadingScreen from './LoadingScreen';
import CaretakerView from './CaretakerView';
import DoctorView from './DoctorView';

export default createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      LoginScreen,
      CaretakerView,
      DoctorView,
    },
    {
      initialRouteName: 'LoadingScreen',
    },
  ),
);

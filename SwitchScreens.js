import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

import LoginScreen from './switchScreens/LoginScreen';
import LoadingScreen from './switchScreens/LoadingScreen';
import CaretakerView from './switchScreens/CaretakerView';
import DoctorView from './switchScreens/DoctorView';

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

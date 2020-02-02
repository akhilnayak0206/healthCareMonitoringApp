import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import EditProfile from './StackProfileScreens/EditProfile';
import Remainder from './StackProfileScreens/Remainder';
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
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(StackProfile);

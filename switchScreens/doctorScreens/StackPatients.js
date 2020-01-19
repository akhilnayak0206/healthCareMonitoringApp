import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Patients from './StackPatientsScreen/Patients';
import PatientDetails from './StackPatientsScreen//PatientDetails';
import Heart from './StackPatientsScreen/Heart';
import PatientProfile from './StackPatientsScreen/PatientProfile';

const StackProfile = createStackNavigator(
  {
    Patients: {
      screen: Patients,
    },
    PatientDetails: {
      screen: PatientDetails,
    },
    Heart: {
      screen: Heart,
    },
    PatientProfile: {
      screen: PatientProfile,
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

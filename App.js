import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  Image,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// import {Button, Form, Item, Label, Input} from 'native-base';
import SwitchScreens from './SwitchScreens';
import Notes from './switchScreens/caretakerScreens/StackProfileScreens/Notes';
import Remainder from './switchScreens/caretakerScreens/StackProfileScreens/Remainder';
// import CaretakerView from './CaretakerView';
// import DoctorView from './DoctorView';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Remainder />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '30%',
    resizeMode: 'contain',
  },
  text: {
    color: 'black',
  },
  button: {
    margin: 20,
    marginTop: 40,
    padding: 0,
    backgroundColor: '#71D7F2',
  },
});

export default App;

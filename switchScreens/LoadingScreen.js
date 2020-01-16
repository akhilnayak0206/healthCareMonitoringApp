import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import firebase from 'react-native-firebase';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('hello', this.props);
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let email =
          firebase.auth().currentUser && firebase.auth().currentUser.email;
        let checkType = firebase
          .database()
          .ref('Users/CheckType/' + email.replace(/@|\./gi, ''));
        checkType.once('value', snapshot => {
          let typeObj = snapshot.val();
          if (typeObj.type == 'p') {
            this.props.navigation.navigate('CaretakerView');
          } else if (typeObj.type == 'd') {
            this.props.navigation.navigate('DoctorView');
          } else {
            alert('Please tell admin to add your designation in database');
          }
        });
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  };

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;

import React, {Component} from 'react';
import {StyleSheet, Text, Image} from 'react-native';

import {Button, Form, Item, Label, Input} from 'native-base';

import firebase from 'react-native-firebase';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  onSubmit = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          this.props.navigation.navigate('LoadingScreen');
        })
        .catch(err => {
          alert(err.toString());
        });
    } catch (error) {
      alert(error.toString());
    }
  };
  render() {
    return (
      <Form style={styles.container}>
        <Image
          source={require('../images/alzheimerLogo.jpg')}
          style={styles.backgroundImage}
        />
        <Item floatingLabel>
          <Label style={styles.text}>Email</Label>
          <Input
            style={styles.text}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={email => this.setState({email})}
          />
        </Item>
        <Item floatingLabel>
          <Label style={styles.text}>Password</Label>
          <Input
            style={styles.text}
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={password => this.setState({password})}
          />
        </Item>
        <Button
          full
          rounded
          style={styles.button}
          onPress={() => this.onSubmit()}>
          <Text style={styles.text}>Log In</Text>
        </Button>
      </Form>
    );
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

export default LoginScreen;

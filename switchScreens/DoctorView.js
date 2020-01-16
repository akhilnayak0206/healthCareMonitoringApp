import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Modal,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firebase from 'react-native-firebase';

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Title,
  Button,
} from 'native-base';

class DoctorView extends Component {
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#71D7F2'}}>
          <Left />
          <Body>
            <Title>Doctor's Tab</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../images/doctor.jpg')} />
              </Left>
              <Body>
                <Text>Kumar Pratik</Text>
                <Text note>Something about the patient</Text>
              </Body>
              <Right></Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../images/doctor.jpg')} />
              </Left>
              <Body>
                <Text>Jumar Thapik</Text>
                <Text note>Something about patient 2</Text>
              </Body>
              <Right></Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../images/doctor.jpg')} />
              </Left>
              <Body>
                <Text>boris manic</Text>
                <Text note>patient 3 info</Text>
              </Body>
              <Right>
                <Text note></Text>
              </Right>
            </ListItem>
          </List>
        </Content>
        <Button
          onPress={() => {
            firebase.auth().signOut();
            this.props.navigation.navigate('LoginScreen');
          }}>
          <Text>Log out this button will not be there</Text>
        </Button>
      </Container>
    );
  }
}

export default DoctorView;

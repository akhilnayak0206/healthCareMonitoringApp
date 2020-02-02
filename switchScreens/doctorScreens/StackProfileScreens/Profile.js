import React, {Component} from 'react';
import {View} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Thumbnail,
  Button,
  Icon,
  List,
  ListItem,
  Right,
} from 'native-base';
import firebase from 'react-native-firebase';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Not Loaded',
      degree: 'Not Loaded',
    };
  }

  getData = () => {
    const email =
      firebase.auth().currentUser && firebase.auth().currentUser.email;
    const refId = email && email.replace(/@|\./gi, '');
    let details = firebase.database().ref('Users/Doctors/' + refId);
    details.once('value', snapshot => {
      let obj = snapshot.val();
      this.setState({
        name: obj.name,
        degree: obj.degree,
      });
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={{flex: 1, padding: '2.5%'}}>
        <Card>
          <CardItem header bordered>
            <Left>
              <Thumbnail source={require('../../../images/doctor.jpg')} />
              <Body>
                <Text>{this.state.name}</Text>
                <Text note>Degree:{this.state.degree}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem
            button
            bordered
            onPress={() => this.props.navigation.push('EditProfile')}>
            <Left>
              <Body>
                <Text>Edit Profile</Text>
              </Body>
            </Left>
            <Right>
              <Icon name="md-arrow-forward" />
            </Right>
          </CardItem>
          <CardItem
            button
            bordered
            onPress={() => this.props.navigation.push('Remainder')}>
            <Left>
              <Body>
                <Text>Remainders</Text>
              </Body>
            </Left>
            <Right>
              <Icon name="md-arrow-forward" />
            </Right>
          </CardItem>
          <CardItem footer bordered style={{display: 'flex'}}>
            <Button
              onPress={() => {
                firebase.auth().signOut();
              }}
              style={{
                backgroundColor: '#71D7F2',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="md-log-out" />
              <Text style={{paddingLeft: '0%'}}>Sign Out</Text>
            </Button>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default Profile;

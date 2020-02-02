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
      datePickerDob: new Date(Date.now()),
    };
  }

  getData = () => {
    const email =
      firebase.auth().currentUser && firebase.auth().currentUser.email;
    const refId = email && email.replace(/@|\./gi, '');
    let details = firebase.database().ref('Users/Patients/' + refId);
    details.once('value', snapshot => {
      let obj = snapshot.val();
      this.setState({
        name: obj.Name,
        datePickerDob: obj.dateOfBirth,
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
                <Text note>
                  Age:{' '}
                  {`${new Date(Date.now()).getFullYear() -
                    new Date(this.state.datePickerDob).getFullYear()}`}
                </Text>
              </Body>
            </Left>
            <Right />
            {/* <Icon name="md-arrow-forward" />
            </Right> */}
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
                <Text>Edit Remainders</Text>
              </Body>
            </Left>
            <Right>
              <Icon name="md-arrow-forward" />
            </Right>
          </CardItem>
          <CardItem footer bordered>
            <Button
              onPress={() => {
                firebase.auth().signOut();
              }}
              style={{
                backgroundColor: '#00BCD4',
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

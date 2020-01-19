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
  render() {
    return (
      <View style={{flex: 1, padding: '2.5%'}}>
        <Card>
          <CardItem header bordered>
            <Left>
              <Thumbnail source={require('../../../images/doctor.jpg')} />
              <Body>
                <Text>Ms. Carolyn L.</Text>
                <Text note>Age: 69</Text>
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
                <Text>Remainders</Text>
              </Body>
            </Left>
            <Right>
              <Icon name="md-arrow-forward" />
            </Right>
          </CardItem>
          <CardItem
            button
            bordered
            onPress={() => this.props.navigation.push('Notes')}>
            <Left>
              <Body>
                <Text>Notes</Text>
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

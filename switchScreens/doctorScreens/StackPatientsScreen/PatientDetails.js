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

class PatientDetails extends Component {
  render() {
    return (
      <View style={{flex: 1, padding: '2.5%'}}>
        <Card>
          <CardItem header bordered>
            <Left>
              <Thumbnail source={require('../../../images/doctor.jpg')} />
              <Body>
                <Text>Ms. Carolyn</Text>
                <Text note>Age: 69</Text>
              </Body>
            </Left>
            <Right />
          </CardItem>
          <CardItem
            button
            bordered
            onPress={() => this.props.navigation.push('Heart')}>
            <Left>
              <Body>
                <Text>Heart Rate</Text>
              </Body>
            </Left>
            <Right>
              <Icon name="md-arrow-forward" />
            </Right>
          </CardItem>
          <CardItem
            button
            bordered
            onPress={() => this.props.navigation.push('PatientProfile')}>
            <Left>
              <Body>
                <Text>Profile</Text>
              </Body>
            </Left>
            <Right>
              <Icon name="md-arrow-forward" />
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default PatientDetails;

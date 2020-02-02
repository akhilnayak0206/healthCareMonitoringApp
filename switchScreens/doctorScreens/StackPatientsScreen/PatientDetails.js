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
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.getParam('patientDetails'),
    };
  }
  render() {
    return (
      <View style={{flex: 1, padding: '2.5%'}}>
        <Card>
          <CardItem header bordered>
            <Left>
              <Thumbnail source={require('../../../images/doctor.jpg')} />
              <Body>
                <Text>{this.state.data.name}</Text>
                <Text note>Age: {this.state.data.age}</Text>
              </Body>
            </Left>
            <Right />
          </CardItem>
          <CardItem
            button
            bordered
            onPress={() =>
              this.props.navigation.push('Heart', {
                patientId: this.state.data.id,
              })
            }>
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
            onPress={() =>
              this.props.navigation.push('PatientProfile', {
                patientData: this.state.data,
              })
            }>
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

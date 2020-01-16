import React, {Component} from 'react';
import {View, Linking} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Text,
  Left,
  Thumbnail,
  Button,
  Icon,
} from 'native-base';

class DoctorsInfo extends Component {
  render() {
    return (
      <View style={{flex: 1, padding: '2.5%'}}>
        <Card style={{}}>
          <CardItem header bordered>
            <Left>
              <Thumbnail source={require('../../images/doctor.jpg')} />
              <Body>
                <Text>Dr. Robert Berriar</Text>
                <Text note>M.B.B.S, M.D</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>
                Dr. Robert Berriar is a specialized Neurosurgeon. He is
                available in H.M.S Hospital from Mon-Fri. His timings are
                12pm-5pm
              </Text>
            </Body>
          </CardItem>
          <CardItem footer bordered style={{display: 'flex'}}>
            <Button
              onPress={() => Linking.openURL(`tel:8888888888`)}
              style={{
                backgroundColor: '#71D7F2',
                flex: 1,
                justifyContent: 'space-around',
              }}>
              <Icon name="md-call" style={{marginRight: '0%'}} />
              <Text style={{paddingLeft: '0%'}}>Book an Appointment</Text>
            </Button>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default DoctorsInfo;

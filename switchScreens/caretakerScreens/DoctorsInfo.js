import React, {Component} from 'react';
import {View, Linking, Modal, ActivityIndicator} from 'react-native';
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
import firebase from 'react-native-firebase';
import {refId} from '../ConstantVar';

class DoctorsInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      name: '',
      description: '',
      phone: '',
      degree: '',
    };
  }

  getData = () => {
    let details = firebase
      .database()
      .ref('Users/Patients/' + refId + '/doctorID');
    details.once('value', snapshot => {
      let doctorID = snapshot.val();
      this.gotDoctorID(doctorID);
    });
  };

  gotDoctorID = doctorID => {
    if (doctorID) {
      let detailsDoctor = firebase.database().ref('Users/Doctors/' + doctorID);
      detailsDoctor.once('value', snapshot => {
        let obj = snapshot.val();
        if (obj) {
          this.setState({
            modalVisible: false,
            name: obj.name,
            description: obj.description,
            phone: obj.phone,
            degree: obj.degree,
          });
        } else {
          this.setState({
            modalVisible: false,
          });
          alert('No data found');
        }
      });
    }
  };

  onCloseModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={{flex: 1, padding: '2.5%'}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.onCloseModal()}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        </Modal>
        <Card>
          <CardItem header bordered>
            <Left>
              <Thumbnail source={require('../../images/doctor.jpg')} />
              <Body>
                <Text>{this.state.name}</Text>
                <Text note>{this.state.degree}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text>{this.state.description}</Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Button
              onPress={() => Linking.openURL(`tel:${this.state.phone}`)}
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

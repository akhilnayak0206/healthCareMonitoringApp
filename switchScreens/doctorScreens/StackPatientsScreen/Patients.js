import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {List, ListItem, Left, Right, Text, Thumbnail, Body} from 'native-base';
import firebase from 'react-native-firebase';
import {refId} from '../../ConstantVar';

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      patients: [],
    };
  }

  getData = () => {
    if (this.state.isMounted) {
      let details = firebase.database().ref('Users/Doctors/' + refId);
      details.on('value', snapshot => {
        let patientsID = [];
        let patients = [];
        let obj = snapshot.val();
        if (obj.patients) {
          Object.keys(obj.patients).map((key, index) => {
            patientsID.push(obj.patients[key]);
          });

          patientsID.map(val => {
            let getPatientDetails = firebase
              .database()
              .ref('Users/Patients/' + val);
            getPatientDetails.on('value', snapshot => {
              let newObj = snapshot.val();
              if (newObj) {
                let age =
                  new Date(Date.now()).getFullYear() -
                  new Date(newObj.dateOfBirth).getFullYear();
                patients.push({
                  name: newObj.Name,
                  age,
                  id: val,
                });
                this.setState({
                  patients,
                });
              }
            });
          });
        } else {
          alert('No remainders ');
        }
      });
    }
  };

  componentDidMount() {
    this.setState({isMounted: true}, () => this.getData());
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.patients &&
            this.state.patients.map(data => (
              <ListItem
                avatar
                key={data.id}
                button
                onPress={() =>
                  this.props.navigation.push('PatientDetails', {
                    patientDetails: data,
                  })
                }>
                <Left>
                  <Thumbnail
                    source={require('../../../images/alzheimerLogo.jpg')}
                  />
                </Left>
                <Body>
                  <Text>{data.name}</Text>
                  <Text note>{data.age}</Text>
                </Body>
              </ListItem>
            ))}
        </List>
      </ScrollView>
    );
  }
}

export default Patients;

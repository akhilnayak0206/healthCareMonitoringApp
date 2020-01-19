import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {List, ListItem, Left, Right, Text, Thumbnail, Body} from 'native-base';

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [
        {
          name: 'Ms. Carolyn L.',
          age: '69',
          note: 'She has Alzheimer',
        },
        {
          name: 'Mr. hello',
          age: '54',
          note: 'He has epilepsy',
        },
        {
          name: 'Ms. Dummy',
          age: '36',
          note: 'She has schizophrenia',
        },
      ],
    };
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.patients &&
            this.state.patients.map((data, key) => (
              <ListItem
                avatar
                key={key}
                button
                onPress={() => this.props.navigation.push('PatientDetails')}>
                <Left>
                  <Thumbnail source={require('../../../images/doctor.jpg')} />
                </Left>
                <Body>
                  <Text>{data.name}</Text>
                  <Text note>{data.note}</Text>
                </Body>
              </ListItem>
            ))}
        </List>
      </ScrollView>
    );
  }
}

export default Patients;

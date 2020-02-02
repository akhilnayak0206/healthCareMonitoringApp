import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Form, Input, Text, Item} from 'native-base';

class PatientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.navigation.getParam('patientData'),
    };
  }
  render() {
    return (
      <ScrollView>
        <Form>
          <Item fixedLabel>
            <Text style={{fontWeight: 'bold'}}>Name:</Text>
            <Input value={this.state.data.name} disabled />
          </Item>
          <Item fixedLabel>
            <Text style={{fontWeight: 'bold'}}>Date of Birth:</Text>
            <Input
              value={`${new Date(
                this.state.data.dateOfBirth,
              ).getDate()}/${new Date(this.state.data.dateOfBirth).getMonth() +
                1}/${new Date(this.state.data.dateOfBirth).getFullYear()}`}
              disabled
            />
          </Item>
          <Item fixedLabel>
            <Text style={{fontWeight: 'bold'}}>Height (inches):</Text>
            <Input value={this.state.data.height} disabled />
          </Item>
          <Item fixedLabel>
            <Text style={{fontWeight: 'bold'}}>Weight (kgs):</Text>
            <Input value={this.state.data.weight} disabled />
          </Item>
        </Form>
      </ScrollView>
    );
  }
}

export default PatientProfile;

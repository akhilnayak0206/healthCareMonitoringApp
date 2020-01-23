import React, {Component} from 'react';
import {View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Form, Text, Label, Input, DatePicker, Item, Button} from 'native-base';
import firebase from 'react-native-firebase';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      datePickerDob: new Date(),
      height: 0,
      weight: 0,
    };
  }

  getData = () => {
    let id = firebase.auth().currentUser && firebase.auth().currentUser.email;
    let details = firebase
      .database()
      .ref('Users/Patients/' + id.replace(/@|\./gi, ''));
    details.on('value', snapshot => {
      let obj = snapshot.val();
      this.setState({
        name: obj.Name,
        datePickerDob: obj.dateOfBirth,
        height: obj.height,
        weight: obj.weight,
      });
    });
  };

  onSetText = (id, val) => {
    this.setState({
      [id]: val,
    });
  };

  onSend = () => {
    let id = firebase.auth().currentUser && firebase.auth().currentUser.email;
    let details = firebase
      .database()
      .ref('Users/Patients/' + id.replace(/@|\./gi, ''));
    details.update(
      {
        Name: this.state.name,
        dateOfBirth: this.state.datePickerDob,
        height: this.state.height,
        weight: this.state.weight,
      },
      err => {
        if (err) {
          alert('Data unsaved');
        } else {
          alert('Saved successfully');
          this.props.navigation.pop();
        }
      },
    );
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.getData();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Form>
          <Item fixedLabel>
            <Text style={{fontWeight: 'bold'}}>Name:</Text>
            <Input
              value={this.state.name}
              onChangeText={val => this.onSetText('name', val)}
            />
          </Item>
          <Item fixedLabel>
            <Text style={{fontWeight: 'bold'}}>Date of Birth: </Text>
            <DatePicker
              defaultDate={new Date(this.state.datePickerDob)}
              minimumDate={new Date(1900, 1, 1)}
              maximumDate={new Date()}
              locale={'en'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText={`${new Date(
                this.state.datePickerDob,
              ).getDate()}/${new Date(
                this.state.datePickerDob,
              ).getMonth()}/${new Date(
                this.state.datePickerDob,
              ).getFullYear()}`}
              textStyle={{color: 'black'}}
              placeHolderTextStyle={{color: 'black'}}
              onDateChange={val => this.onSetText('datePickerDob', val)}
              disabled={false}
            />
          </Item>
          <Item fixedLabel>
            <Text style={{fontWeight: 'bold'}}>Height (inch):</Text>
            <Input
              keyboardType="numeric"
              value={`${this.state.height}`}
              onChangeText={val => this.onSetText('height', val)}
            />
          </Item>
          <Item fixedLabel style={{justifyContent: 'flex-start'}}>
            <Text style={{fontWeight: 'bold'}}>Weight (Kg.):</Text>
            <Input
              keyboardType="numeric"
              value={`${this.state.weight}`}
              onChangeText={val => this.onSetText('weight', val)}
            />
          </Item>
        </Form>
        <Button
          onPress={() => this.onSend()}
          style={{
            backgroundColor: '#71D7F2',
            marginRight: '5%',
            marginLeft: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Save</Text>
        </Button>
      </View>
    );
  }
}

export default EditProfile;

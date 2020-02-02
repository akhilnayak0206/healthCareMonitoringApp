import React, {Component} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Form, Text, Label, Input, DatePicker, Item, Button} from 'native-base';
import firebase from 'react-native-firebase';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      name: '',
      datePickerDob: new Date(),
      height: 0,
      weight: 0,
      modalVisible: true,
    };
  }

  getData = () => {
    if (this.state.isMounted) {
      const email =
        firebase.auth().currentUser && firebase.auth().currentUser.email;
      const refId = email && email.replace(/@|\./gi, '');
      let details = firebase.database().ref('Users/Patients/' + refId);
      details.on('value', snapshot => {
        let obj = snapshot.val();
        this.setState({
          name: obj.Name,
          datePickerDob: obj.dateOfBirth,
          height: obj.height,
          weight: obj.weight,
          modalVisible: false,
        });
      });
    }
  };

  onSetText = (id, val) => {
    this.setState({
      [id]: val,
    });
  };

  onSend = () => {
    this.setState({modalVisible: true});
    const email =
      firebase.auth().currentUser && firebase.auth().currentUser.email;
    const refId = email && email.replace(/@|\./gi, '');
    let details = firebase.database().ref('Users/Patients/' + refId);
    details.update(
      {
        Name: this.state.name,
        dateOfBirth: this.state.datePickerDob,
        height: this.state.height,
        weight: this.state.weight,
      },
      err => {
        this.setState({modalVisible: false});
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
    this.setState({isMounted: true}, () => this.getData());
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.props.navigation.pop()}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        </Modal>
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
              placeHolderText={
                // prettier-ignore
                `${new Date(this.state.datePickerDob).getDate()}/${
                  new Date(this.state.datePickerDob).getMonth() +1}/${
                  new Date(this.state.datePickerDob).getFullYear()}`
              }
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

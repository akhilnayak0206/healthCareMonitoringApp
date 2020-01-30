import React, {Component} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  Form,
  Text,
  Label,
  Input,
  DatePicker,
  Item,
  Button,
  Textarea,
} from 'native-base';
import firebase from 'react-native-firebase';
import {refId} from '../../ConstantVar';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      name: '',
      degree: '',
      description: '',
      modalVisible: true,
    };
  }

  getData = () => {
    if (this.state.isMounted) {
      let details = firebase.database().ref('Users/Doctors/' + refId);
      details.on('value', snapshot => {
        let obj = snapshot.val();
        this.setState({
          name: obj.name,
          degree: obj.degree,
          description: obj.description,
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
    let details = firebase.database().ref('Users/Doctors/' + refId);
    details.update(
      {
        name: this.state.name,
        degree: this.state.degree,
        description: this.state.description,
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

  onCloseModal = () => {
    this.setState(
      {
        modalVisible: false,
      },
      () => this.props.navigation.pop(),
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
          onRequestClose={() => this.onCloseModal()}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        </Modal>
        <Form>
          <Item floatingLabel>
            <Label>Name:</Label>
            <Input
              value={this.state.name}
              onChangeText={val => this.onSetText('name', val)}
            />
          </Item>
          <Item floatingLabel>
            <Label>Degree:</Label>
            <Input
              keyboardType="numeric"
              value={`${this.state.degree}`}
              onChangeText={val => this.onSetText('degree', val)}
            />
          </Item>
          <Item stackedLabel style={{marginBottom: '5%'}}>
            <Label>Description:</Label>
            <Textarea
              rowSpan={5}
              value={`${this.state.description}`}
              onChangeText={val => this.onSetText('description', val)}
              bordered
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

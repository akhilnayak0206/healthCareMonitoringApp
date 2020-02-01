import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import {List, ListItem, Left, Right} from 'native-base';
import firebase from 'react-native-firebase';

class Heart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.getParam('patientId'),
      heart: [],
    };
  }

  getData = () => {
    if (this.state.isMounted) {
      let details = firebase.database().ref('Users/Patients/' + this.state.id);
      details.on('value', snapshot => {
        let heart = [];
        let obj = snapshot.val();
        if (obj.heartRate) {
          Object.keys(obj.heartRate).map((key, index) => {
            heart.push(obj.heartRate[key]);
          });

          heart.sort((a, b) => {
            let first = a.time;
            let second = b.time;
            first = first.split(' ');
            second = second.split(' ');
            if (first[0] < second[0]) return 1;

            if (first[0] > second[0]) return -1;

            if (first[0] == second[0]) {
              if (first[1] < second[1]) return 1;

              if (first[1] > second[1]) return -1;

              return 0;
            }
          });
          this.setState({
            heart,
          });
        } else {
          alert('No Heart Rate found. Please check the device ');
        }
      });
    }
  };

  componentDidMount() {
    this.setState({isMounted: true}, () => this.getData());
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    });
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.heart &&
            this.state.heart.map((obj, key) => (
              <ListItem key={key}>
                <Left>
                  <Text style={{fontWeight: 'bold'}}>Heart Rate:</Text>
                  <Text>{obj.bpm} BPM</Text>
                </Left>
                <Text style={{fontWeight: 'bold'}}>Time:</Text>
                <Text>{obj.time}</Text>
              </ListItem>
            ))}
        </List>
      </ScrollView>
    );
  }
}

export default Heart;

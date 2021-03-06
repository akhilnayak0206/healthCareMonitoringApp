import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import {List, ListItem, Left} from 'native-base';
import firebase from 'react-native-firebase';

class Heart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: [],
    };
  }

  getData = () => {
    if (this.state.isMounted) {
      const email =
        firebase.auth().currentUser && firebase.auth().currentUser.email;
      const refId = email && email.replace(/@|\./gi, '');
      let details = firebase.database().ref('Users/Patients/' + refId);
      details.on('value', snapshot => {
        let heart = [];
        let obj = snapshot.val();
        if (obj && obj.heartRate) {
          Object.keys(obj.heartRate).map((key, index) => {
            heart.push(obj.heartRate[key]);
          });

          heart.sort((a, b) => {
            let first = a.time;
            let second = b.time;
            first = first.split(' ');
            dummyFirst = first[0].split('/');
            first[0] = dummyFirst.reverse().join();
            second = second.split(' ');
            dummySecond = second[0].split('/');
            second[0] = dummySecond.reverse().join();
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

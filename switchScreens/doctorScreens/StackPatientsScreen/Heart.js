import React, {Component} from 'react';
import {Text, ScrollView} from 'react-native';
import {List, ListItem, Left, Right} from 'native-base';

class Heart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: [
        {rate: 73, time: '16-02-2020 18:08'},
        {rate: 83, time: '16-02-2020 18:09'},
        {rate: 95, time: '16-02-2020 18:10'},
        {rate: 68, time: '16-02-2020 18:11'},
        {rate: 85, time: '16-02-2020 18:12'},
        {rate: 66, time: '16-02-2020 18:13'},
        {rate: 86, time: '16-02-2020 18:14'},
        {rate: 83, time: '16-02-2020 18:15'},
      ],
    };
  }

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.heart &&
            this.state.heart.map((obj, key) => (
              <ListItem key={key}>
                <Left>
                  <Text>Heart Rate: {obj.rate} BPM</Text>
                </Left>
                <Right>
                  <Text>{obj.time}</Text>
                </Right>
              </ListItem>
            ))}
        </List>
      </ScrollView>
    );
  }
}

export default Heart;

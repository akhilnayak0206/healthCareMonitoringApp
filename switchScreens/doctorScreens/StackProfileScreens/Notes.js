import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, List, ListItem} from 'native-base';

class Notes extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <List>
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default Notes;

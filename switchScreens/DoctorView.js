import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Modal,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  Button,
  Form,
  Item,
  Label,
  Input,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Tab,
  Tabs,
  ScrollableTab,
  Content,
  Icon,
  TabHeading,
} from 'native-base';
import firebase from 'react-native-firebase';

import StackProfile from './doctorScreens/StackProfile';
import StackPatients from './doctorScreens/StackPatients';

class DoctorView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: '#71D7F2'}} hasTabs>
          <Body style={{flexDirection: 'row'}}>
            <Icon name="heart" style={{color: '#fff'}} />
            <Title style={{marginLeft: '5%'}}>Doctor's Tab</Title>
          </Body>
          <Right />
        </Header>
        <Tabs tabBarPosition="bottom" tabBarBackgroundColor="#71D7F2">
          <Tab
            tabBarUnderlineStyle={{backgroundColor: '#71D7F2'}}
            heading="Patients"
            tabStyle={{backgroundColor: '#71D7F2'}}
            textStyle={{color: '#000', textAlign: 'center'}}
            activeTabStyle={{backgroundColor: '#71D7F2'}}
            activeTextStyle={{
              color: '#fff',
              fontWeight: 'normal',
              textAlign: 'center',
            }}>
            <StackPatients />
          </Tab>
          <Tab
            tabBarUnderlineStyle={{backgroundColor: '#71D7F2'}}
            heading="Profile"
            tabStyle={{backgroundColor: '#71D7F2'}}
            textStyle={{color: '#000', textAlign: 'center'}}
            activeTabStyle={{backgroundColor: '#71D7F2'}}
            activeTextStyle={{
              color: '#fff',
              fontWeight: 'normal',
              textAlign: 'center',
            }}>
            <StackProfile />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

export default DoctorView;

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

import DoctorsInfo from './caretakerScreens/DoctorsInfo';
import Gps from './caretakerScreens/Gps';

class CaretakerView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: '#71D7F2'}} hasTabs>
          <Body style={{flexDirection: 'row'}}>
            <Icon name="heart" style={{color: '#fff'}} />
            <Title style={{marginLeft: '5%'}}>Care Taker</Title>
          </Body>
          <Right />
        </Header>
        <Tabs tabBarPosition="bottom" tabBarBackgroundColor="#71D7F2">
          <Tab
            tabBarUnderlineStyle={{backgroundColor: '#71D7F2'}}
            heading="GPS"
            tabStyle={{backgroundColor: '#71D7F2'}}
            textStyle={{color: '#000', textAlign: 'center'}}
            activeTabStyle={{backgroundColor: '#71D7F2'}}
            activeTextStyle={{
              color: '#fff',
              fontWeight: 'normal',
              textAlign: 'center',
            }}>
            <Gps />
          </Tab>

          <Tab
            tabBarUnderlineStyle={{backgroundColor: '#71D7F2'}}
            heading="Heart"
            tabStyle={{backgroundColor: '#71D7F2'}}
            textStyle={{color: '#000', textAlign: 'center'}}
            activeTabStyle={{backgroundColor: '#71D7F2'}}
            activeTextStyle={{
              color: '#fff',
              fontWeight: 'normal',
              textAlign: 'center',
            }}>
            <Text>Heart</Text>
          </Tab>

          <Tab
            tabBarUnderlineStyle={{backgroundColor: '#71D7F2'}}
            heading="Games"
            tabStyle={{backgroundColor: '#71D7F2'}}
            textStyle={{color: '#000', textAlign: 'center'}}
            activeTabStyle={{backgroundColor: '#71D7F2'}}
            activeTextStyle={{
              color: '#fff',
              fontWeight: 'normal',
              textAlign: 'center',
            }}>
            <Text>Games</Text>
          </Tab>
          <Tab
            tabBarUnderlineStyle={{backgroundColor: '#71D7F2'}}
            heading="Doctor's Info"
            tabStyle={{backgroundColor: '#71D7F2'}}
            textStyle={{color: '#000', textAlign: 'center'}}
            activeTabStyle={{backgroundColor: '#71D7F2'}}
            activeTextStyle={{
              color: '#fff',
              fontWeight: 'normal',
              textAlign: 'center',
            }}>
            <DoctorsInfo />
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
            <Button
              onPress={() => {
                firebase.auth().signOut();
                this.props.navigation.navigate('LoginScreen');
              }}>
              <Text>Log out this button will not be there</Text>
            </Button>
          </Tab>
        </Tabs>
      </View>
    );
  }
}

export default CaretakerView;

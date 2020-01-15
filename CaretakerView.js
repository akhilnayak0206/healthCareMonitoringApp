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

class CaretakerView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{backgroundColor: '#71D7F2'}} hasTabs>
          <Left />
          <Body>
            <Title>Caretaker</Title>
          </Body>
          <Right />
        </Header>
        <Tabs
          renderTabBar={() => <ScrollableTab />}
          tabBarPosition="bottom"
          tabBarBackgroundColor="#71D7F2">
          <Tab
            tabBarUnderlineStyle={{backgroundColor: '#71D7F2'}}
            heading={
              <TabHeading
                tabStyle={{backgroundColor: '#71D7F2'}}
                activeTabStyle={{backgroundColor: '#71D7F2'}}
                activeTextStyle={{color: '#fff', fontWeight: 'bold'}}
                textStyle={{color: '#000'}}>
                <Icon name="home" />
                <Text>
                  {'\n'}
                  Doctor
                </Text>
              </TabHeading>
            }>
            <Text>Doctor Calling Option</Text>
          </Tab>
          <Tab tabStyle={{backgroundColor: '#71D7F2'}} heading="GPS">
            {/* <Tab2 /> */}
            <Text>GPS Map Will Come Here of patients whereabout</Text>
          </Tab>
          {/* <Tab tabStyle={{backgroundColor: '#71D7F2'}} heading="Games">
            <Tab3 />
            <Text>Games</Text>
          </Tab>*/}
          <Tab tabStyle={{backgroundColor: '#71D7F2'}} heading="SignOut">
            {/* <Tab4 /> */}
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

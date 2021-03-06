import React, {Component} from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  Button,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  Content,
  Form,
  Textarea,
  Input,
  List,
  ListItem,
} from 'native-base';
import firebase from 'react-native-firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

import PushNotification from 'react-native-push-notification';

class Remainder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      allIds: [],
      modalVisible: true,
      isMounted: false,
      remainders: [],
      addVisible: false,
      showTime: false,
      time: '',
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
        if (obj.Remainders) {
          let allIds = [];
          let remainders = [];
          Object.keys(obj.Remainders).map((key, index) => {
            allIds.push(obj.Remainders[key].id);
            remainders.push({...obj.Remainders[key], key});
          });
          remainders.sort((a, b) => {
            return Number(a.time) - Number(b.time);
          });
          this.setState({
            remainders,
            allIds,
            modalVisible: false,
          });
        } else {
          this.setState({
            remainders: [],
            allIds: [],
            modalVisible: false,
          });
          alert('No remainders ');
        }
      });
    }
  };

  setTime = time => {
    time = time.nativeEvent.timestamp || this.state.time;
    if (time < Date.now()) {
      time = time + 86400000;
    }
    this.setState({
      showTime: Platform.OS === 'ios' ? true : false,
      time,
    });
  };

  setData = id => {
    const email =
      firebase.auth().currentUser && firebase.auth().currentUser.email;
    const refId = email && email.replace(/@|\./gi, '');
    this.setState({modalVisible: true});
    let details = firebase
      .database()
      .ref('Users/Patients/' + refId + '/Remainders');
    details.push().set(
      {
        title: this.state.title,
        message: this.state.message,
        time: this.state.time,
        id,
      },
      err => {
        this.setState({modalVisible: false});
        if (err) {
          alert('Remainder not set.');
        } else {
          this.setState({
            modalVisible: false,
            addVisible: false,
            title: '',
            message: '',
            time: '',
          });
          alert('Remainder set successfully');
        }
      },
    );
  };

  checkId = () => {
    if (this.state.title && this.state.message && this.state.time) {
      let id = this.state.allIds.length;
      while (this.state.allIds.indexOf(JSON.stringify(id)) !== -1) {
        id += 1;
      }
      id = JSON.stringify(id);
      this.setAlarm(id);
      this.setData(id);
    } else {
      alert('Please fill title, description and time');
    }
  };

  alarmNotWorking = () => {
    this.state.remainders.map(val => {
      let time = val.time;
      if (new Date(Date.now()).getHours() > new Date(time).getHours() - 1) {
        time += 86400000;
      }
      PushNotification.localNotificationSchedule({
        /* Android Only Properties */
        id: val.id,
        ticker: 'My Notification Ticker',
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        vibrate: true,
        vibration: 300,
        tag: 'some_tag',
        group: 'group',
        ongoing: false,
        priority: 'high',
        visibility: 'public',
        importance: 'high',
        userInfo: {id: val.id},
        /* iOS and Android properties */
        title: val.title,
        message: val.message,
        date: new Date(time),
        playSound: false,
        soundName: 'default',
        repeatType: 'day',
      });
    });
  };

  setAlarm = id => {
    PushNotification.localNotificationSchedule({
      /* Android Only Properties */
      id: id,
      ticker: 'My Notification Ticker',
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      vibrate: true,
      vibration: 300,
      tag: 'some_tag',
      group: 'group',
      ongoing: false,
      priority: 'high',
      visibility: 'public',
      importance: 'high',
      userInfo: {id},
      /* iOS and Android properties */
      title: this.state.title,
      message: this.state.message,
      date: new Date(this.state.time),
      playSound: false,
      soundName: 'default',
      repeatType: 'day',
    });
  };

  cancelAlarm = obj => {
    Alert.alert(
      `Delete Remainder`,
      `Do you want to delete ${obj.title}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed for delete'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            PushNotification.cancelLocalNotifications({id: obj.id});
            const email =
              firebase.auth().currentUser && firebase.auth().currentUser.email;
            const refId = email && email.replace(/@|\./gi, '');
            let deleteAlarm = firebase
              .database()
              .ref('Users/Patients/' + refId + '/Remainders/' + obj.key);
            deleteAlarm.once('value', snapshot => {
              if (snapshot.val()) {
                deleteAlarm.remove();
              }
            });
            alert('Remainder Deleted');
          },
        },
      ],
      {cancelable: false},
    );
  };

  cancelAllAlarm = () => {
    Alert.alert(
      `Delete All Remainders`,
      `Do you want to delete all Remainders`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed for delete'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            PushNotification.cancelAllLocalNotifications();
            const email =
              firebase.auth().currentUser && firebase.auth().currentUser.email;
            const refId = email && email.replace(/@|\./gi, '');
            let deleteAlarm = firebase
              .database()
              .ref('Users/Patients/' + refId + '/Remainders/');
            deleteAlarm.once('value', snapshot => {
              if (snapshot.val()) {
                deleteAlarm.remove();
              }
            });
            alert('All remainders cleared');
          },
        },
      ],
      {cancelable: false},
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
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.props.navigation.pop()}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'black',
              opacity: 0.4,
            }}>
            <ActivityIndicator size="large" />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addVisible}
          onRequestClose={() => this.setState({addVisible: false})}>
          <View style={{flex: 1, backgroundColor: 'black', opacity: 0.3}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => this.setState({addVisible: false})}
            />
          </View>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1}}>
              <Header style={{backgroundColor: '#00BCD4'}}>
                <Left>
                  <Button
                    transparent
                    onPress={() => this.setState({addVisible: false})}>
                    <Icon type="AntDesign" name="arrowleft" />
                  </Button>
                </Left>
                <Body>
                  <Title>Add To-Do</Title>
                </Body>
                <Right />
              </Header>
              <Content padder>
                <ScrollView>
                  <Form>
                    <Input
                      style={{borderBottomColor: 'black', borderWidth: 1}}
                      placeholder="Title"
                      value={this.state.title}
                      onChangeText={title => this.setState({title})}
                    />
                    <Textarea
                      rowSpan={3}
                      style={{
                        borderBottomColor: 'black',
                        borderWidth: 1,
                        marginTop: '1%',
                      }}
                      placeholder="Description"
                      value={this.state.message}
                      onChangeText={message => this.setState({message})}
                    />
                    <Button
                      transparent
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}
                      onPress={() =>
                        this.setState({
                          showTime: true,
                        })
                      }>
                      <Text style={{paddingLeft: '0%', color: 'black'}}>
                        Time:
                      </Text>
                      {this.state.time ? (
                        <Text>{`${new Date(
                          this.state.time,
                        ).getHours()}:${new Date(
                          this.state.time,
                        ).getMinutes()}`}</Text>
                      ) : (
                        <Text>Set Time</Text>
                      )}
                      {this.state.showTime && (
                        <DateTimePicker
                          value={new Date(Date.now())}
                          mode={'time'}
                          is24Hour={false}
                          display="default"
                          onChange={time => this.setTime(time)}
                        />
                      )}
                    </Button>
                  </Form>
                </ScrollView>
              </Content>
              <Button
                style={{justifyContent: 'center', backgroundColor: '#00BCD4'}}
                onPress={() => this.checkId()}>
                <Text>Set Alarm</Text>
              </Button>
            </View>
          </View>
        </Modal>

        <View style={{flexDirection: 'row'}}>
          <Button
            style={{flex: 1, backgroundColor: '#00BCD4', margin: '1%'}}
            onPress={() => this.cancelAllAlarm()}>
            <Text style={{textAlign: 'center'}}>Clear All Remainders</Text>
          </Button>
          <Button
            style={{
              flex: 1,
              backgroundColor: '#00BCD4',
              margin: '1%',
            }}
            onPress={() => this.alarmNotWorking()}>
            <Text style={{textAlign: 'center'}}>Remainders Not Working</Text>
          </Button>
        </View>

        <ScrollView>
          <List>
            {this.state.remainders.map(val => (
              <ListItem key={val.id}>
                <Body>
                  <Text>{val.title}</Text>
                  <Text note numberOfLines={3}>
                    Description: {val.message}
                  </Text>
                  <Text note numberOfLines={1}>
                    Time:
                    {`${new Date(val.time).getHours()}:${new Date(
                      val.time,
                    ).getMinutes()}`}
                  </Text>
                </Body>
                <Right>
                  <Button transparent onPress={() => this.cancelAlarm(val)}>
                    <Icon
                      style={{color: 'red'}}
                      type="AntDesign"
                      name="delete"
                    />
                  </Button>
                </Right>
              </ListItem>
            ))}
          </List>
        </ScrollView>

        <Button
          style={styles.bottomButton}
          rounded
          large
          onPress={() => this.setState({addVisible: true})}>
          <Icon type="Feather" name="plus" />
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomButton: {
    position: 'absolute',
    zIndex: 5,
    bottom: '5%',
    right: '5%',
    height: 75,
    width: 75,
    flex: 1,
    backgroundColor: '#00BCD4',
  },
});

export default Remainder;

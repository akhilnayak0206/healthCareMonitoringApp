import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import {
  Text,
  Card,
  Body,
  Left,
  CardItem,
  Button,
  Icon,
  ListItem,
  CheckBox,
  Content,
  Radio,
} from 'native-base';

const Games = () => {
  const [allQuestions, setAllQuestions] = useState([]);

  const [questionID, setQuestionID] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let details = firebase.database().ref('Users/Questions');
    details.once('value', snapshot => {
      let questionsArr = [];
      let questionsObj = snapshot.val();
      Object.keys(questionsObj).map((key, index) => {
        if (questionsObj[key]) {
          questionsArr.push(questionsObj[key]);
        }
      });
      setAllQuestions(questionsArr);
    });
  };

  const setID = val => {
    if (val == 'b') {
      if (questionID - 1 < 0) {
        ToastAndroid.show(
          'Sorry this is the first question. To play again please scroll and press reset',
          ToastAndroid.SHORT,
        );
      } else {
        let id = questionID - 1;
        setQuestionID(id);
      }
    } else {
      if (questionID + 1 > allQuestions.length - 1) {
        ToastAndroid.show(
          'Sorry this is the last question, To play again please scroll and press reset',
          ToastAndroid.SHORT,
        );
      } else {
        let id = questionID + 1;
        setQuestionID(id);
      }
    }
  };

  const radioSelected = val => {
    setSelectedAnswer(val);
  };

  const submitAnswer = () => {
    if (selectedAnswer == allQuestions[questionID].answer) {
      if (questionID + 1 > allQuestions.length - 1) {
        ToastAndroid.show(
          'Right Answer !, To play again please scroll and press reset',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show('Right Answer !', ToastAndroid.SHORT);
        let id = questionID + 1;
        setQuestionID(id);
        setSelectedAnswer();
      }
    } else {
      ToastAndroid.show(
        'Wrong Answer. Select the Right Answer !',
        ToastAndroid.SHORT,
      );
    }
  };

  const resetPressed = () => {
    ToastAndroid.show(`Let's Play`, ToastAndroid.SHORT);
    setQuestionID(0);
    setSelectedAnswer();
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{padding: '2.5%'}}>
          {allQuestions.length &&
          allQuestions[questionID].questions &&
          allQuestions[questionID].option1 &&
          allQuestions[questionID].option2 &&
          allQuestions[questionID].option3 &&
          allQuestions[questionID].option4 &&
          allQuestions[questionID].answer ? (
            <Card>
              <CardItem bordered>
                <Left>
                  <Body>
                    <Text style={{fontWeight: 'bold'}}>
                      {allQuestions[questionID].questions}
                    </Text>
                  </Body>
                </Left>
              </CardItem>

              {allQuestions[questionID].img && (
                <CardItem cardBody>
                  <Image
                    source={{uri: `${allQuestions[questionID].img}`}}
                    style={{
                      height: 100,
                      width: null,
                      flex: 1,
                      resizeMode: 'contain',
                    }}
                  />
                </CardItem>
              )}
              <CardItem>
                <Content>
                  <ListItem
                    button
                    onPress={() =>
                      radioSelected(allQuestions[questionID].option1)
                    }>
                    <Radio
                      onPress={() =>
                        radioSelected(allQuestions[questionID].option1)
                      }
                      color={'#f0ad4e'}
                      selectedColor={'#5cb85c'}
                      selected={
                        selectedAnswer == allQuestions[questionID].option1
                          ? true
                          : false
                      }
                    />
                    <Body>
                      <Text>{allQuestions[questionID].option1}</Text>
                    </Body>
                  </ListItem>
                  <ListItem
                    button
                    onPress={() =>
                      radioSelected(allQuestions[questionID].option2)
                    }>
                    <Radio
                      onPress={() =>
                        radioSelected(allQuestions[questionID].option2)
                      }
                      color={'#f0ad4e'}
                      selectedColor={'#5cb85c'}
                      selected={
                        selectedAnswer == allQuestions[questionID].option2
                          ? true
                          : false
                      }
                    />
                    <Body>
                      <Text>{allQuestions[questionID].option2}</Text>
                    </Body>
                  </ListItem>
                  <ListItem
                    button
                    onPress={() =>
                      radioSelected(allQuestions[questionID].option3)
                    }>
                    <Radio
                      onPress={() =>
                        radioSelected(allQuestions[questionID].option3)
                      }
                      color={'#f0ad4e'}
                      selectedColor={'#5cb85c'}
                      selected={
                        selectedAnswer == allQuestions[questionID].option3
                          ? true
                          : false
                      }
                    />
                    <Body>
                      <Text>{allQuestions[questionID].option3}</Text>
                    </Body>
                  </ListItem>
                  <ListItem
                    button
                    onPress={() =>
                      radioSelected(allQuestions[questionID].option4)
                    }>
                    <Radio
                      onPress={() =>
                        radioSelected(allQuestions[questionID].option4)
                      }
                      color={'#f0ad4e'}
                      selectedColor={'#5cb85c'}
                      selected={
                        selectedAnswer == allQuestions[questionID].option4
                          ? true
                          : false
                      }
                    />
                    <Body>
                      <Text>{allQuestions[questionID].option4}</Text>
                    </Body>
                  </ListItem>
                </Content>
              </CardItem>
              <CardItem style={{paddingTop: '0%'}}>
                <Button
                  onPress={() => submitAnswer()}
                  style={{
                    flex: 1,
                    backgroundColor: '#00BCD4',
                    margin: '1%',
                    justifyContent: 'center',
                  }}>
                  <Text>Submit Answer</Text>
                </Button>
              </CardItem>
              <CardItem>
                <Button
                  onPress={() => resetPressed()}
                  style={{
                    flex: 1,
                    backgroundColor: '#00BCD4',
                    margin: '1%',
                    justifyContent: 'center',
                  }}>
                  <Text>Reset Game</Text>
                </Button>
              </CardItem>
            </Card>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </ScrollView>
      <Button
        style={styles.bottomRight}
        rounded
        large
        onPress={() => setID('p')}>
        <Icon type="AntDesign" name="arrowright" />
      </Button>
      <Button
        style={styles.bottomLeft}
        rounded
        large
        onPress={() => setID('b')}>
        <Icon type="AntDesign" name="arrowleft" />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomRight: {
    position: 'absolute',
    zIndex: 5,
    bottom: '5%',
    right: '5%',
    height: 75,
    width: 75,
    flex: 1,
    backgroundColor: '#00BCD4',
  },
  bottomLeft: {
    position: 'absolute',
    zIndex: 5,
    bottom: '5%',
    left: '5%',
    height: 75,
    width: 75,
    flex: 1,
    backgroundColor: '#00BCD4',
  },
});

export default Games;

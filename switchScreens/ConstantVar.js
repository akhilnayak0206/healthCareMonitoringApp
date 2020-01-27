import firebase from 'react-native-firebase';

const email = firebase.auth().currentUser && firebase.auth().currentUser.email;
const refId = email && email.replace(/@|\./gi, '');

export {email, refId};

# HealthCare Monitoring App

This app helps the patient's doctor and family members to get an update about the patient suffering from Alzheimer's disease.  
This is a **React-Native** project and the device is made with the help of **Raspberry Pi** and other **Sensors**.  
The code used in raspberry pi for sensors is not attached to this repo.  
ScreenShots of the app will be attached above in the folder named ScreenShots.

## Quick Start

```bash
# Install all dependencies
yarn install

# Run on Android
react-native run-android

# Run on iOS
react-native run-ios
```

## Features of this App

- Same app for both doctors and caretaker(patient's nurse or family member)
- Login Page would directly take the user to the doctor's tab or caretaker's tab depending on the user-type.

- ### Caretaker's Tab

  - Brain boosting quiz games added for the patient.
  - Get realtime as well as past heart rate(bpm) of the patient.
  - Get real-time GPS of the patient.
  - Get local notification about when to take medicines.
  - Directly get the phone number of the doctor by just clicking a button.

- ### Doctor's Tab

  - Get a list of all your patients.
  - Get patient's details like heart rate, weight, height, etc.
  - Set Remainders for yourself.
  - Edit your details like description, phone number, etc. so that your patient's caretaker could see.

## Packages Installed

- react
- react-native
- native-base
- react-native-community/datetimepicker
- react-native-firebase
- react-native-maps
- react-native-push-notification
- react-navigation

**react** is a JavaScript library for building user interfaces.  
**react-native** is an open-source mobile application framework created by Facebook.  
**native-base** is a free and open-source UI component library for React Native to build native mobile apps for iOS and Android platforms.  
**react-native-community/datetimepicker** is a date and time picker component for Android and iOS.  
**react-native-firebase** makes using Firebase with React Native simple.  
**react-native-maps** provides a Map component that uses Apple Maps or Google Maps on iOS and Google Maps on Android.  
**react-native-push-notification** is a local and remote notification for iOS and Android.  
**react-navigation** is a standalone library that allows navigating between screens.

**Note:** _Electroencephalography sensor can be added in the future to give the doctors a brief idea of what is happening to the Alzheimer suffering patient._

## Project Info

### Author

> Akhil Nayak

### License

> This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.

### Special Thanks

Thanks, InstaMocks for the awesome devices to wrap my screenshots.

#### If you have any suggestion or doubt do let me know

#### ThankYou.Peace

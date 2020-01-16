import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

class Gps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 19.076,
        longitude: 72.8777,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={this.state.region}>
          <Marker coordinate={this.state.region} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Gps;

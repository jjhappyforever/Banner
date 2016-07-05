/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Banner from './Banner';
import CustomBanner from './CustomBanner';


class TianMaoBanner extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Banner/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:23,
    flex:1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TianMaoBanner', () => TianMaoBanner);

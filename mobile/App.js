import React from 'react';
import {  StatusBar, StyleSheet, YellowBox  } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" style={styles.statusBar}/>
      <Routes />
    </>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    textAlign: 'center',
  },
})

export default App;
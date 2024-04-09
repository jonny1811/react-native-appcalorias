import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import Routes from './src/routes';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
        <Routes />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
})

export default App;

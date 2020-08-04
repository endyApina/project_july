import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { StyleSheet, Text, View } from 'react-native';
import { store, persistor } from './src/redux/store';
import Routes from './Routes';

export default function App() {
  return (
    <Provider store={store}> 
      <PersistGate persistor={persistor}> 
        <Routes />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

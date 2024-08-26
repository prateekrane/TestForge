import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Root/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './Screens/Main';
import Response from './Screens/Response';


export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>


  );
}


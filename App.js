
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, View, Text, TextInput, Alert, StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useForm, Controller } from "react-hook-form";
import InscriptionScreen from './components/Inscription';
import ConnectionScreen from './components/Connection';
import EnvoyerScreen from './components/Envoyer';
import AllScreen from './components/All';
import PhotoScreen from './components/Photo.js';
import SnapsScreen from './components/Snaps.js';
import SnapScreen from './components/Snap.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  body: {
   flex: 1,
   fontSize: 20,
   alignItems: 'center',
   justifyContent: 'space-around'
  }
});

const HomeInscription = ({navigation}) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>

    <Button
      title="INSCRIPTION 🆕"
      color="#841584"
    onPress={() => navigation.navigate('Inscription')}
  />
  <Button
    styles={styles.button}
    title="CONNEXION 👤"
    onPress={() => navigation.navigate('Connection')}
  />

  <Button
    styles={styles.button}
    title="SNAPS RECU 📨"
    onPress={() => navigation.navigate('Snaps')}
  />
  <Button
    styles={styles.button}
    title="SNAP 📷"
    onPress={() => navigation.navigate('Photo')}
  />
</View>
)
const Home = ({navigation}) => (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

  <Text>Home Screen</Text>
  <Button
    title="SNAPS RECU 📨"
    onPress={() => navigation.navigate('Snaps')}
  />
  <Button
    title="SNAP 📷"
    onPress={() => navigation.navigate('Photo')}
  />
</View>
)

function HomeScreen({navigation,route}) {
  const [token,setToken]=useState(async function () {await AsyncStorage.getItem('token')})
  useEffect(() => {
    if (route.params) {
        setToken(route.params.token)
    }
  },[token]);
  return !route.params ? <HomeInscription navigation={navigation}/> : <Home navigation={navigation}/>
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Inscription" component={InscriptionScreen} />
      <Stack.Screen name="Connection" component={ConnectionScreen} />
      <Stack.Screen name="Envoyer" component={EnvoyerScreen} />
      <Stack.Screen name="All" component={AllScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
      <Stack.Screen name="Snaps" component={SnapsScreen} />
      <Stack.Screen name="Snap" component={SnapScreen} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}

export default App;

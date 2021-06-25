import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Text, TextInput, Alert, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SnapsScreen({route, navigation}) {

const [snaps, setSnaps] = useState(null);

useEffect(() => {
  liste()
}, [snaps])


async function getAll() {
  let token = await AsyncStorage.getItem('token');
    const requestOptions = {
      method: 'GET',
      headers: { 'token': token }
  };
    const url = 'https://snapi-wac.herokuapp.com/snaps'
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }

async function liste() {
  getAll().then((data) => {
    setSnaps(data.data);
  });
}
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
  });

    return (
      <View style={styles.container}>

      <Text>✨ Vos snap reçu ✨</Text>
{snaps ? snaps.map((element, index) => { return <Text key={element.snap_id} ><Button title={element.from} onPress={() => navigation.navigate('Snap', {id: element.snap_id, duration: element.duration, email: element.from})} /></Text>; }) : <Text>Loading...</Text>}

      </View>
    );
  }

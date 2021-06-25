import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Text, TextInput, Alert, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AllScreen({route, navigation}) {

const [all, setAll] = useState(null);

useEffect(() => {
  demarrer()
})

async function getAll() {
  let token = await AsyncStorage.getItem('token');
    const requestOptions = {
      method: 'GET',
      headers: { 'token': token }
  };
    const url = 'https://snapi-wac.herokuapp.com/all'

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }

 async function demarrer() {
   getAll().then((data) => {
     setAll(data.data);
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
  const { image } = route.params;
    return (
      <View style={styles.container}>

{all ? <FlatList data={all} keyExtractor={(item, index) => 'key'+index} renderItem={({item}) => <Button title={item.email} onPress={() => navigation.navigate('Envoyer', {to: item.email, image: image})} />} /> : <Text>Loading...</Text>}

      </View>
    );
  }

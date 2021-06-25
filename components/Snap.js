import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Image, Text, TextInput, Alert, StyleSheet, FlatList, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

export default function SnapScreen({route, navigation}) {
const [snap, setSnap] = useState(null);

const [isPlaying, setIsPlaying] = React.useState(true)

useEffect(() => {
  show()
},[])

async function show() {
    let token = await AsyncStorage.getItem('token');
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream', 'token': token }
    };
      const url = 'https://snapi-wac.herokuapp.com/snap/'+route.params.id;
     fetch(url, requestOptions)
        .then(response => response.blob())
        .then(function (res) {
            let blob = new Blob([res], {type: "image/png"});
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              let base64 = reader.result;
              setSnap(base64);
            }
        })
        .catch((error) => console.error(error))
  }

async function supp() {
  let token = await AsyncStorage.getItem('token');
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'token': token },
      body: JSON.stringify({id: route.params.id})
  };
    const url = 'https://snapi-wac.herokuapp.com/seen';
    return await fetch(url, requestOptions)
      .then((response) => response)
      .catch((error) => error)
  }


    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => all(data.email, data.password);
    const styles = StyleSheet.create({
    body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
    img: {
    resizeMode: "contain",
    width: 900,
    height: 1000,
    padding: 3
    },

  });
    return (
      <View style={styles.body}>
      <Text>Snap de {route.params.email}</Text>
      <Text>Durée {route.params.duration} secondes</Text>
      <CountdownCircleTimer isPlaying={isPlaying} duration={route.params.duration}
  colors={[
    ['#004777', 0.4],
    ['#F7B801', 0.4],
    ['#A30000', 0.2],
  ]}
    onComplete={() => {[false]; supp(); navigation.navigate("Snaps")}}
  >
{({ remainingTime, animatedColor }) => (
  <Animated.Text style={{ color: animatedColor, fontSize: 40 }}>
    {remainingTime}
  </Animated.Text>
)}
</CountdownCircleTimer>
      <Image style={styles.logo} source={{ uri: snap}} />
      {snap ? <Image source={{ uri: snap}} style={{width: 200, height: 200}}/> : <Text>Loading...</Text>}
      </View>
    );
  }

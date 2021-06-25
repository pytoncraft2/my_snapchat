import * as React from 'react';
import { useForm, Controller } from "react-hook-form";
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Text, TextInput, Alert, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
export default function ConnectionScreen({navigation}) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => connection(data.email, data.password, navigation);
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Email'
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && <Text>This is required.</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Password'
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="password"
          defaultValue=""
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    );
  }
  function getConnection(email, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
  };
    const url = 'https://snapi-wac.herokuapp.com/connection'
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }

  async function connection(email, password, navigation) {
  getConnection(email, password).then((data) => {
    if (typeof(data.data) === 'object') {
      alert(data.data.email);
      alert(data.data.token);
      AsyncStorage.setItem('token', data.data.token);

      let jeton =  AsyncStorage.getItem('token')
      jeton.then(function(result) {
        navigation.navigate('Home',{token: result});
    });
    } else {
      alert(data.data);
    }
  });
  }

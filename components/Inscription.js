import * as React from 'react';
import { useForm, Controller } from "react-hook-form";
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Text, TextInput, Alert, StyleSheet  } from 'react-native';

export default function InscriptionScreen({navigation}) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => register(data.email, data.password);
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
  function getRegister(email, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
  };
    const url = 'https://snapi-wac.herokuapp.com/inscription'
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }
  
  function register(email, password) {
  getRegister(email, password).then(data => alert(data.data.email));
  }
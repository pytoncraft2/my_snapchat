import * as React from 'react';
import { useForm, Controller } from "react-hook-form";
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Text, TextInput, Alert, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConnectionScreen({route, navigation}) {
    const { to, image } = route.params;
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => snap(data.duration, data.to, image);
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
  });
  async function send(duration, to, image) {
    let formData = new FormData();    //formdata object
    let token = await AsyncStorage.getItem('token');
    formData.append('duration', duration);
    formData.append('to', to);
    formData.append('image', image);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data', 'token': token },
      body: formData
    };
    const url = 'https://snapi-wac.herokuapp.com/snap'
    return fetch(url, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }

  function snap(duration, to, image) {
  send(duration, to, image).then((data) => {
    navigation.goBack();
  });
  }

    return (
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='To'
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="to"
          rules={{ required: true }}
          defaultValue={to}
        />
        {errors.to && <Text>This is required.</Text>}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder='Duration'
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="duration"
          defaultValue="5"
        />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    );
  }

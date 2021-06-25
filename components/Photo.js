import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { Button, View, Image, Text, TouchableOpacity, TextInput, Alert, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({navigation}) {

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if( result.uri){
        let nom=result.uri.split("/");
        let nomImage=nom[nom.length-1]
        let typeImage=nomImage.split(".");
         typeImage=typeImage[typeImage.length-1]
        let image={
            uri: result.uri,
            name: "Image",
            type: "image/"+typeImage,
        }
        console.log(image)
        navigation.navigate('All', {image});
    }

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const [recording, setRecording] = useState(false)
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ref => {
        setCameraRef(ref) ;
  }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly'
            }}>
            <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>

          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync();
              if( photo.uri){
                console.log(photo)
                let nom=photo.uri.split("/");
                let nomImage=nom[nom.length-1]
                let typeImage=nomImage.split(".");
                typeImage=typeImage[typeImage.length-1]

                let image={
                    uri: photo.uri,
                    name: "photo.png",
                    type: "image/png",
                }
                console.log(image)
                navigation.navigate('All', {image});

            }
            }
          }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Button title="Pick an image from camera roll" onPress={pickImage} />
  {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
            <View style={{
               borderWidth: 2,
               borderRadius:25,
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:25,
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
              if(!recording){
                setRecording(true)
              let video = await cameraRef.recordAsync();
              console.log('video', video);
            } else {
                setRecording(false)
                cameraRef.stopRecording()
            }
          }}>
            <View style={{
               borderWidth: 2,
               borderRadius:25,
               borderColor: 'red',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:25,
                 borderColor: recording ? "blue":'red',
                 height: 40,
                 width:40,
                 backgroundColor: recording ? "blue":'red'}} >
              </View>
            </View>
          </TouchableOpacity>
            </View>
        </View>
      </Camera>
    </View>
  );
}

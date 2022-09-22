import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as ImageManipulator from 'expo-image-manipulator';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleOpenImagePickerAsync() {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (result.cancelled) {
      return;
    }

    setSelectedImage(result.uri);
  }

  async function handleOpenShare() {
    if (Platform.OS === 'web') {
      alert('ops, Your platform does not support this function.');

      return;
    }

    const imageTmp = await ImageManipulator.manipulateAsync(selectedImage);

    await Sharing.shareAsync(imageTmp.uri);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.thumbnail} />
        <TouchableOpacity style={styles.button}>
          <Text onPress={handleOpenShare} style={styles.textButton}>
            Share this Photo
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={{ uri: 'https://i.imgur.com/TkIrScD.png' }}
        style={styles.logo}
      />

      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>
      <TouchableOpacity
        onPress={handleOpenImagePickerAsync}
        style={styles.button}
      >
        <Text style={styles.textButton}>Pick a Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
});

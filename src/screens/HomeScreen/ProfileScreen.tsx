/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { View, StyleSheet, Text, Pressable, Image, Alert } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';


import { Color, FontFamily, FontSize } from '../GlobalStyles';

function HomeScreen() {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const storage = getStorage();

  const home = (<Icon name="home" size={24} color="#18181a" />)
  const profile = (<Icon name="user" size={24} color="#18181a" />);
  const settings = (<Icon name="cog" size={24} color="#18181a" />);

  const [profileImage, setProfileImage] = useState(null);

  const uploadProfileImage = async () => {
    const options = {
      mediaType: 'photos',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    //
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Seleção de imagens cancelada pelo utilizador');
      }
      else if (response.error) {
        console.log('Erro do seletor de imagens:', response.error);
        Alert.alert('Erro', 'Ocorreu um erro ao selecionar a imagem de perfil.');
      }
      else {
        let imageUri = response.uri || response.assets?.[0].uri;
        setProfileImage(imageUri);
        uploadImageToFirebase(response);
      }
    });

    const uploadImageToFirebase = (image: ImagePickerResponse) => {
      if (user) {
        const userId = user.uid;
        const storageRef = ref(storage, `users/${userId}/profileImage/${image.fileName}`);

        uploadBytes(storageRef, profileImage)
          .then(() => {
            Alert.alert('Sucesso', 'Imagem de perfil alterada com sucesso.');
          })
          .catch((error) => {
            console.log(error);
            Alert.alert('Erro', 'Ocorreu um erro ao alterar a imagem de perfil.');
          });
      }
    };
  };

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.mediumTopAppBar}>
        <Text style={styles.mediumTopAppBar__title}>Perfil</Text>
        <Pressable style={styles.settingsButton} onPress={() => navigation.navigate('SettingsScreen')}>
          {settings}
        </Pressable>
      </View>
      <View style={styles.body}>
        <Pressable onPress={uploadProfileImage}>
          <Image style={styles.profileImage} source={user?.photoURL || undefined} />
        </Pressable>
        <Text style={styles.profileName} >{user?.displayName}</Text>
        <Text style={styles.profileEmail} >{user?.email}</Text>
      </View>
      <View style={styles.bottomMenu}>
        <Pressable style={styles.bottonMenu__unselected} onPress={() => navigation.navigate('HomeScreen')}>
          {home}
        </Pressable>
        <Pressable style={styles.bottonMenu__selected}>
          {profile}
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  mediumTopAppBar: {
    height: 112,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediumTopAppBar__title: {
    marginTop: 32,
    fontSize: FontSize.size_9xl,
    letterSpacing: 0.3,
    lineHeight: 36,
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_100,
  },
  settingsButton: {
    width: 24,
    height: 24,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 180,
    height: 180,
    marginTop: 40,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: Color.colorGray_100,
  },
  profileName: {
    marginTop: 42,
    fontSize: 36,
    letterSpacing: 0.4,
    lineHeight: 36,
    fontWeight: '700',
    fontFamily: FontFamily.interBold,
    color: '#18181a',
    textAlign: 'center',
  },
  profileEmail: {
    marginTop: 16,
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontFamily: FontFamily.interRegular,
    color: '#18181a',
    textAlign: 'center',
  },
  bottomMenu: {
    width: '100%',
    height: 80,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottonMenu__selected: {
    width: 64,
    height: 32,
    borderRadius: 16,
    backgroundColor: Color.colorGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottonMenu__unselected: {
    width: 64,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH, FIRESTORE } from '../../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Pressable, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection } from 'firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color, FontFamily, FontSize } from '../GlobalStyles';

function HomeScreen() {
  const home = (<Icon name="home" size={24} color="#18181a" />);
  const profile = (<Icon name="user" size={24} color="#18181a" />);
  const add = (<Icon name="plus" size={24} color="#FFFFFF8C" />);

  const navigation = useNavigation();
  const storage = getStorage();
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE;
  const user = auth.currentUser;

  // upload de ficheiros de áudio para o storage e firestore
  const handleAudioFile = async () => {
    try {
      const userId = user.uid;
      // verificar se o utilizador está autenticado
      if (!user) {
        Alert.alert('Erro', 'Não está autenticado.');
        return;
      }

      // para selecionar vários ficheiros audio
      const results = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.audio],
      });

      // definir 
      const userFilesRef = collection(db, 'userFiles');
      const docRef = await setDoc(doc(userFilesRef, userId), {});

      // adicionar ficheiros áudio ao firestore e storage
      for (const result of results) {

        // adicionar ficheiros ao storage
        const storageRef = ref(storage, `users/${userId}/audio/${result.name}`);
        const snapshot = await uploadBytes(storageRef, result);

        //
        const audioFileRef = collection(db, `userFiles/${userId}/files`);

        // adicionar ficheiros ao firestore
        await setDoc(doc(audioFileRef), {
          fileName: result.name,
          fileSize: result.size,
          fileType: result.type,
          filePath: `users/${userId}/audio/${result.name}`,
          timestamp: new Date().toISOString(),
          downloadUrl: await getDownloadURL(snapshot.ref),
        });
      }
      Alert.alert('Successo', 'Os ficheiros de áudio foram carregados.');

    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // quando o utilizador cancela a seleção de ficheiros
      } else {
        console.error('Error:', error);
        Alert.alert('Erro', 'Falha ao selecionar e carregar o ficheiro de áudio.');
      }
    }
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // useEffect(() => {
  //   if (user) {
  //     const userId = user.uid;
  //     const userFilesRef = collection(firestore, 'userFiles').doc(userId).collection('files');

  //     // Subscribe to user-specific file updates from Firestore
  //     const unsubscribe = userFilesRef.onSnapshot((snapshot) => {
  //       const files = snapshot.docs.map(doc => doc.data().fileName);
  //       setUploadedFiles(files);
  //     });

  //     return () => {
  //       // Unsubscribe from Firestore updates when component unmounts
  //       unsubscribe();
  //     };
  //   }
  // }, []);

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.mediumTopAppBar}>
        <Text style={styles.mediumTopAppBar__title}>Áudios</Text>
      </View>
      <View style={styles.body}>
        <Pressable style={styles.addButton} onPress={handleAudioFile}>
          {add}
          <Text style={styles.addButton__text}>Adicionar áudios</Text>
        </Pressable>
        <View style={styles.audioList}>
          <Text style={styles.audioList__title}>Recentes</Text>
          <ScrollView>

          </ScrollView>
        </View>
      </View>
      <View style={styles.bottomMenu}>
        <Pressable style={styles.bottonMenu__selected}>
          {home}
        </Pressable>
        <Pressable style={styles.bottonMenu__unselected} onPress={() => navigation.navigate('ProfileScreen')}>
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
    width: '100%',
    height: 112,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 20,
  },
  mediumTopAppBar__title: {
    marginTop: 32,
    fontSize: FontSize.size_9xl,
    letterSpacing: 0.3,
    lineHeight: 36,
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_100,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  addButton: {
    width: 276,
    height: 56,
    marginTop: 40,
    borderRadius: 100,
    backgroundColor: Color.colorGray_100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addButton__text: {
    marginLeft: 8,
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20,
    fontFamily: FontFamily.interBold,
    color: Color.colorHalfWhite,
    textAlign: 'left',
  },
  audioList: {
    flex: 1,
    width: '100%',
    marginTop: 60,
    backgroundColor: 'green',
  },
  audioList__title: {
    marginBottom: 40,
    fontSize: FontSize.size_9xl,
    letterSpacing: 0.3,
    lineHeight: 36,
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_100,
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

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../firebase/firebaseConfig';
import { getDatabase, ref as dRef, set, onValue } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Pressable, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
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
  const db = getDatabase();
  const user = auth.currentUser;

  // upload de ficheiros de áudio para o storage e firestore
  const handleAudioFile = async () => {
    try {
      const userId = user?.uid;

      // para selecionar vários ficheiros audio
      const results = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.audio],
      });

      // adicionar ficheiros áudio ao firestore e storage
      for (const result of results) {

        // adicionar ficheiros ao storage
        const storageRef = sRef(storage, `users/${userId}/audio/${result.name}`);
        const snapshot = await uploadBytes(storageRef, result);

        // adicionar ficheiros ao realtime database
        set(dRef(db, 'users/' + userId + '/audioFiles/' + result.size), {
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

  // obter ficheiros de áudio do realtime database
  const [audioFiles, setAudioFiles] = useState([]);

  useEffect(() => {
    const userId = user?.uid;

    const starCountRef = dRef(db, `users/${userId}/audioFiles/`);
    onValue(starCountRef, (snapshot) => {
      const fetchFiles = [];
      snapshot.forEach((childSnapshot) => {
        fetchFiles.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setAudioFiles(fetchFiles);
    });
  }, [db, user]);

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
            {audioFiles.map((file, index) => (
              <View key={file.id} style={styles.audioItem}>
                <Text>{file.fileName}</Text>
                {/* Add other details you want to display */}
              </View>
            ))}
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
  audioItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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

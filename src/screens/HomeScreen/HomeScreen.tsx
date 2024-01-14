/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from '../../firebase/firebaseConfig';
import { getDatabase, ref as dRef, set, onValue } from 'firebase/database';
import { getStorage, ref as sRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Pressable, ScrollView, Alert, Modal } from 'react-native';
import { FFmpegKit, FFmpegKitConfig, ReturnCode } from 'ffmpeg-kit-react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { LinearGradient } from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color, FontFamily, FontSize } from '../GlobalStyles';

function HomeScreen() {
  const home = (<Icon name="home" size={24} color="#18181a" />);
  const profile = (<Icon name="user" size={24} color="#18181a" />);
  const add = (<Icon name="plus" size={24} color="#FFFFFF8C" />);
  const threeDots = (<Icon name="ellipsis-v" size={24} color="#18181a" />);

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
        // converter o uri para blob
        const file = await uriToBlob(result.uri);
        console.log('HEREEEE: ' + result.uri);

        // adicionar ficheiros ao storage
        const storageRef = sRef(storage, `users/${userId}/audioFiles/${result.name}`);
        const snapshot = await uploadBytes(storageRef, file);

        // adicionar ficheiros ao realtime database
        set(dRef(db, 'users/' + userId + '/audioFiles/' + result.size), {
          fileName: result.name,
          fileSize: result.size,
          fileType: result.type,
          filePath: `users/${userId}/audio/${result.name}`,
          timestamp: new Date().toISOString(),
          downloadUrl: await getDownloadURL(snapshot.ref),
        });

        Alert.alert('Successo', 'Os ficheiros de áudio foram carregados.');
      }

    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // quando o utilizador cancela a seleção de ficheiros
      } else {
        console.error('Erro:', error);
        Alert.alert('Erro', 'Falha ao selecionar e carregar o ficheiro de áudio.');
      }
    }
  };

  // criar blob a partir do ficheiro selecionado
  function uriToBlob(uri: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // If successful -> return with blob
      xhr.onload = function () {
        resolve(xhr.response);
      };

      // reject on error
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };

      // Set the response type to 'blob' - this means the server's response 
      // will be accessed as a binary object
      xhr.responseType = 'blob';

      // Initialize the request. The third argument set to 'true' denotes 
      // that the request is asynchronous
      xhr.open('GET', uri, true);

      // Send the request. The 'null' argument means that no body content is given for the request
      xhr.send(null);
    });
  }

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

  // converter ficheiro de áudio e fazer upload para o storage
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);

  const handleMenuPress = (file) => {
    setSelectedAudioFile(file);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAudioFile(null);
  };

  // Converter o ficheiro de áudio utilizando FFMPEG com base no formato selecionado
  const convertAndUpload = async (format) => {
    if (!selectedAudioFile) {
      console.error('selectedAudioFile is null or undefined');
      Alert.alert('Erro', 'Ficheiro de áudio não selecionado.');
      return;
    }

    try {
      const userId = user?.uid;
      const { fs } = RNFetchBlob;

      const { downloadUrl, fileName } = selectedAudioFile;
      console.log(downloadUrl);

      let command;
      let outputFilePath = `${fs.dirs.DocumentDir}/converted_audio.${format}`;

      const temporaryFilePath = RNFetchBlob.fs.dirs.DocumentDir + `${fs.dirs.DocumentDir}/${fileName}`;
      RNFetchBlob
        .config({ path: temporaryFilePath })
        .fetch('GET', downloadUrl)
        .then((res) => {
          console.log('The file saved to ', res.path());
        });

      switch (format) {
        case 'mp3':
          command = `-hide_banner -y -i ${temporaryFilePath} -c:a libmp3lame -qscale:a 2 ${outputFilePath}`;
          break;
        case 'ogg':
          command = `-hide_banner -y -i ${temporaryFilePath} -c:a libvorbis -b:a 64k ${outputFilePath}`;
          break;
        default:
          Alert.alert('Erro', 'Formato de áudio inválido.');
          return;
      }

      FFmpegKit.executeAsync(command, async (session) => {
        const state = FFmpegKitConfig.sessionStateToString(await session.getState());
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();

        if (ReturnCode.isSuccess(returnCode)) {
          // separar o nome do ficheiro e a extensão
          const convertedFileName = fileName.split('.').slice(0, -1).join('.');
          console.log(convertedFileName);

          // carregar o ficheiro convertido para o Firebase Storage
          const filePath = `file://${outputFilePath}`;
          const file = await uriToBlob(filePath);
          const storageRef = sRef(storage, `users/${userId}/audioFiles/${convertedFileName}.${format}`);
          const snapshot = await uploadBytes(storageRef, file);

          // adicionar ficheiros ao realtime database
          set(dRef(db, 'users/' + user?.uid + '/audioFiles/' + snapshot.metadata.size), {
            fileName: `${convertedFileName}.${format}`,
            fileSize: snapshot.metadata.size,
            fileType: `${format}`,
            filePath: `users/${userId}/audio/${convertedFileName}.${format}`,
            timestamp: new Date().toISOString(),
            downloadUrl: await getDownloadURL(snapshot.ref),
          });

          Alert.alert('Successo', 'Ficheiro convertido e carregado com sucesso!');
        } else if (ReturnCode.isCancel(returnCode)) {
          Alert.alert('Erro', 'A conversão foi cancelada.');
        } else {
          Alert.alert('Erro', 'Falha ao converter o ficheiro de áudio.');
        }
      });
    } catch (error) {
      console.error('Erro de conversão:', error);
      Alert.alert('Erro', 'Falha ao converter o ficheiro de áudio.');
    } finally {
      closeModal();
    }
  };

  // Descarregar o ficheiro de áudio selecionado para o dispositivo
  const downloadToDevice = async () => {
    if (selectedAudioFile) {
      try {
        // Obter o URL de transferência do ficheiro áudio selecionado a partir do Firestore
        const downloadUrl = selectedAudioFile.downloadUrl;

        // Criar o caminho do ficheiro de destino
        const docPath = RNFetchBlob.fs.dirs.DocumentDir;
        console.log('docPath: ' + docPath);
        const filePath = `${docPath}/audioFiles/`;
        console.log('filePath: ' + filePath);

        // Descarregar o ficheiro do Firebase Storage utilizando o URL de descarregamento
        RNFetchBlob.config({
          path: filePath,
          fileCache: true,
        })
          .fetch('GET', downloadUrl)
          .then(async res => {
            let status = res.info().status;
            if (status === 200) {
              console.log('The file saved to ', res.path());
              Alert.alert('Successo', 'Ficheiro descarregado com sucesso!');
            } else {
              console.error('Erro ao descarregar o ficheiro:', status);
              Alert.alert('Erro', 'Falha ao descarregar o ficheiro.');
            }

          })
          .catch((errorMessage) => {
            console.error('Erro ao descarregar o ficheiro:', errorMessage);
            Alert.alert('Erro', 'Falha ao descarregar o ficheiro.');
          });
      } catch (error) {
        console.error('Erro:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao descarregar o ficheiro.');
      }
    }
    closeModal();
  };

  const deleteAudioFile = async () => {
    if (!selectedAudioFile) {
      console.error('selectedAudioFile é nulo ou indefinido');
      Alert.alert('Erro', 'Ficheiro de áudio não selecionado.');
      return;
    }

    try {
      const userId = user?.uid;

      // Eliminar do Firebase Storage
      const storageRef = sRef(storage, `users/${userId}/audioFiles/${selectedAudioFile.fileName}`);
      await deleteObject(storageRef);

      // Eliminar da base de dados em tempo real
      const dbRef = dRef(db, `users/${userId}/audioFiles/${selectedAudioFile.id}`);
      await set(dbRef, null);

      Alert.alert('Successo', 'Ficheiro de áudio removido com sucesso!');
    } catch (error) {
      console.error('Erro ao eliminar o ficheiro:', error);
      Alert.alert('Erro', 'Falha ao eliminar o ficheiro de áudio.');
    } finally {
      closeModal();
    }
  };

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
                <Text style={styles.audioItem__text}>{file.fileName}</Text>
                <Pressable style={styles.audioItem__icon} onPress={() => handleMenuPress(file)}>{threeDots}</Pressable>
              </View>
            ))}
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(!isModalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Opções</Text>
                <Pressable style={styles.modalOption} onPress={() => convertAndUpload('mp3')}>
                  <Text style={styles.modalText}>Converter para MP3 e carregar</Text>
                </Pressable>
                <Pressable style={styles.modalOption} onPress={() => convertAndUpload('ogg')}>
                  <Text style={styles.modalText} >Converter para OGG e carregar</Text>
                </Pressable>
                <Pressable style={styles.modalOption} onPress={downloadToDevice}>
                  <Text style={styles.modalText}>Transferir para o dispositivo</Text>
                </Pressable>
                <Pressable style={styles.modalOption} onPress={deleteAudioFile}>
                  <Text style={styles.modalText}>Eliminar o ficheiro</Text>
                </Pressable>
                <Pressable style={styles.modalOption} onPress={closeModal}>
                  <Text style={styles.modalText}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  audioItem__text: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray_100,
    textAlign: 'left',
  },
  audioItem__icon: {
    width: 24,
    height: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: Color.colorGray_100,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: FontSize.size_9xl,
    letterSpacing: 0.3,
    lineHeight: 36,
    fontFamily: FontFamily.interBold,
    color: Color.colorHalfWhite,
  },
  modalOption: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: Color.colorGray_400,
  },
  modalText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interBold,
    color: Color.colorHalfWhite,
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

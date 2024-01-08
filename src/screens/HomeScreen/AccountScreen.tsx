/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, Text, Modal, Alert, TextInput } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color, FontFamily, FontSize } from '../GlobalStyles';
import { updateProfile } from 'firebase/auth';

function AccountScreen() {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const arrowLeft = (<Icon name="arrow-left" size={24} color="#18181a" />);
  const edit = (<Icon name="edit" size={24} color="#18181a" />);

  const [modalVisibleName, setModalVisibleName] = useState(false);
  const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
  const [modalVisiblePassword, setModalVisiblePassword] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveName = () => {
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: newName,
      }).then(() => {
        Alert.alert('Sucesso', 'Nome alterado com sucesso.');
      }).catch((error) => {
        Alert.alert('Erro', 'Ocorreu um erro ao alterar o nome.');
      });
    }
    setNewName('');
    setModalVisibleName(!modalVisible);
  };

  const handleSaveEmail = () => {
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        email: newEmail,
      }).then(() => {
        Alert.alert('Sucesso', 'Email alterado com sucesso.');
      }).catch((error) => {
        Alert.alert('Erro', 'Ocorreu um erro ao alterar o email.');
      });
    }
    setNewEmail('');
    setModalVisibleEmail(!modalVisible);
  };

  const handleSavePassword = () => {
    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        password: newPassword,
      }).then(() => {
        Alert.alert('Sucesso', 'Palavra passe alterada com sucesso.');
      }).catch((error) => {
        Alert.alert('Erro', 'Ocorreu um erro ao alterar a palavra passe.');
      });
    }
    setNewPassword('');
    setModalVisiblePassword(!modalVisible);
  };

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.smallTopAppBar}>
        <Pressable style={styles.returnIcon} onPress={() => navigation.navigate('SettingsScreen')}>{arrowLeft}</Pressable>
        <Text style={styles.smallTopAppBar__title}>Informações da conta</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.accountInfo}>
          <Text style={styles.accountInfo__text}>Nome</Text>
          <Pressable onPress={() => setModalVisibleName(true)}>{edit}</Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleName}
            onRequestClose={() => {
              setModalVisibleName(!modalVisibleName);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Editar nome</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Novo nome"
                  onChangeText={(text) => setNewName(text)}
                  value={newName}
                />
                <View style={styles.buttonContainer}>
                  <Pressable style={[styles.button, styles.buttonSave]} onPress={handleSaveName}>
                    <Text style={styles.buttonText}>Guardar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisibleName(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountInfo__text}>Endereço de e-mail</Text>
          <Pressable onPress={() => setModalVisibleEmail(true)}>{edit}</Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleEmail}
            onRequestClose={() => {
              setModalVisibleEmail(!modalVisibleEmail);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Editar endereço de e-mail</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Novo endereço de e-mail"
                  onChangeText={(text) => setNewEmail(text)}
                  value={newEmail}
                />
                <View style={styles.buttonContainer}>
                  <Pressable style={[styles.button, styles.buttonSave]} onPress={handleSaveEmail}>
                    <Text style={styles.buttonText}>Guardar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisibleEmail(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountInfo__text}>Palavra passe</Text>
          <Pressable onPress={() => setModalVisiblePassword(true)}>{edit}</Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisiblePassword}
            onRequestClose={() => {
              setModalVisiblePassword(!modalVisiblePassword);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Editar palavra-passe</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nova palavra-passe"
                  onChangeText={(text) => setNewPassword(text)}
                  value={newPassword}
                  secureTextEntry={true}
                />
                <View style={styles.buttonContainer}>
                  <Pressable style={[styles.button, styles.buttonSave]} onPress={handleSavePassword}>
                    <Text style={styles.buttonText}>Guardar</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisiblePassword(false)}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </LinearGradient >
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  smallTopAppBar: {
    height: 112,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  returnIcon: {
    width: 24,
    height: 24,
    marginTop: 32,
  },
  smallTopAppBar__title: {
    marginTop: 32,
    marginLeft: 16,
    fontSize: 24,
    letterSpacing: 0.3,
    lineHeight: 36,
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_100,
  },
  body: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  accountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  accountInfo__text: {
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray_100,
    textAlign: 'left',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_100,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#5e5e5e',
  },
  buttonClose: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontFamily: FontFamily.interRegular,
    fontSize: 16,
  },
});

export default AccountScreen;

/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, Text, Modal, Alert } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color, FontFamily, FontSize } from '../GlobalStyles';

function AccountScreen() {
  const navigation = useNavigation();

  const arrowLeft = (<Icon name="arrow-left" size={24} color="#18181a" />);
  const edit = (<Icon name="edit" size={24} color="#18181a" />);

  const [modalVisible, setModalVisible] = useState(false);

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
          <Pressable onPress={() => setModalVisible(true)}>{edit}</Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Fechado');
              setModalVisible(!modalVisible)
            }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ width: '80%', height: '30%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                <Text style={{ fontSize: 20, fontFamily: FontFamily.interBold, color: Color.colorGray_100 }}>Editar nome</Text>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountInfo__text}>Endereço de e-mail</Text>
          <Pressable>{edit}</Pressable>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.accountInfo__text}>Palavra passe</Text>
          <Pressable>{edit}</Pressable>
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
});

export default AccountScreen;

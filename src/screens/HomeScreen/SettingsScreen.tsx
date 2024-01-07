/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { Color, FontFamily, FontSize } from '../GlobalStyles';

function SettingsScreen() {
  const navigation = useNavigation();

  const returnIcon = (<Icon name="arrow-down" size={24} color="#18181a" />);
  const account = (<Icon name="user" size={24} color="#18181a" />);
  const arrowRight = (<Icon name="arrow-right" size={24} color="#18181a" />);

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.smallTopAppBar}>
        <Pressable style={styles.returnIcon} onPress={() => navigation.navigate('ProfileScreen')}>{returnIcon}</Pressable>
        <Text style={styles.smallTopAppBar__title}>Definições</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.directorySection}>
          <Pressable style={styles.downloadButton}>

          </Pressable>
        </View>
        <View style={styles.accountSection}>
          <Text style={styles.accountSection__title}>Conta</Text>
          <View style={styles.accountSection__account}>
            <Text style={styles.accountSection__account__icon}>{account}</Text>
            <Text style={styles.accountSection__account__text}>Informações da conta</Text>
            <Pressable style={styles.accountSection__account__icon} onPress={() => navigation.navigate('AccountScreen')}>{arrowRight}</Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
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
    fontFamily: 'Inter-Bold',
    color: Color.colorGray_100,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  directorySection: {
    paddingHorizontal: 16,
  },
  downloadButton: {
    width: '100%',
    height: 112,
    marginTop: 40,
    borderRadius: 16,
    backgroundColor: Color.colorGray_100,
  },
  accountSection: {
    marginTop: 40,
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: 'red',
  },
  accountSection__title: {
    marginBottom: 20,
    fontSize: 24,
    letterSpacing: 0.3,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Color.colorGray_100,
  },
  accountSection__account: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  accountSection__account__icon: {
    width: 24,
    height: 24,
  },
  accountSection__account__text: {
    marginLeft: 16,
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray_100,
    textAlign: 'left',
  },
});

export default SettingsScreen;

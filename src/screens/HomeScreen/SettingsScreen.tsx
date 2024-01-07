/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { Color } from '../GlobalStyles';

function SettingsScreen() {
  const navigation = useNavigation();
  const returnIcon = (<Icon name="arrow-down" size={24} color="#18181a" />);

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.smallTopAppBar}>
        <Pressable style={styles.returnIcon} onPress={() => navigation.navigate('ProfileScreen')}>{returnIcon}</Pressable>
        <Text style={styles.smallTopAppBar__title}>Definicoes</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.directorySection}>
          <Pressable style={styles.downloadButton}>

          </Pressable>
        </View>
        <View style={styles.accountSection}>
          <Text style={styles.accountSection__title}>Conta</Text>
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
    backgroundColor: 'red',
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
    paddingHorizontal: 16,
  },
  accountSection__title: {
    marginTop: 40,
    fontSize: 24,
    letterSpacing: 0.3,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: Color.colorGray_100,
  },
});

export default SettingsScreen;

/* eslint-disable prettier/prettier */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Color, FontFamily, FontSize } from '../GlobalStyles';

function AccountScreen() {
  const navigation = useNavigation();

  const arrowLeft = (<Icon name="arrow-left" size={24} color="#18181a" />);

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
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_100,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default AccountScreen;

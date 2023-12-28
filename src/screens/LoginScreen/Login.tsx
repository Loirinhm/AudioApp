/* eslint-disable prettier/prettier */
import React from 'react';

import { View, StyleSheet, Pressable, Text, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { FontFamily, FontSize, Color } from '../GlobalStyles';

function Login() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView>
        <View style={styles.largeTopAppBar}>
          <Text style={styles.largeTopAppBar__title}>App Name</Text>
        </View>
        <View style={styles.body}>
          <Pressable style={styles.body__buttonGoogle}>
            <Text style={styles.button__text}>Login com Google</Text>
            <Image resizeMode="cover" source={{ uri: 'Google.png' }} />
          </Pressable>
          <Pressable style={styles.body__buttonFacebook}>
            <Text style={styles.button__text}>Login com Facebook</Text>
          </Pressable>
          <Pressable style={styles.body__loginEmail} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.loginEmail__text}>Login com email</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  largeTopAppBar: {
    width: '100%',
    height: 152,
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 20,
  },
  largeTopAppBar__title: {
    marginTop: 68,
    fontSize: 52,
    letterSpacing: 0.5,
    lineHeight: 36,
    fontFamily: FontFamily.bebasNeueRegular,
    color: Color.colorGray_100,
    textAlign: 'left',
  },
  body: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  body__buttonGoogle: {
    paddingLeft: 16,
    borderRadius: 16,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    backgroundColor: Color.colorGray_100,
  },
  body__buttonFacebook: {
    marginTop: 16,
    paddingLeft: 16,
    borderRadius: 16,
    width: '100%',
    height: 56,
    justifyContent: 'center',
    backgroundColor: Color.colorGray_100,
  },
  button__text: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0.1,
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: FontFamily.interSemiBold,
    color: 'rgba(255, 255, 255, 0.55)',
    textAlign: 'center',
  },
  body__loginEmail: {
    alignItems: 'center',
    marginTop: 30,
  },
  loginEmail__text: {
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: FontFamily.interSemiBold,
    color: '#4b5649',
    textAlign: 'center',
  },
});

export default Login;

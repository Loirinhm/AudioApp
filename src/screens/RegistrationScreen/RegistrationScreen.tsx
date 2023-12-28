/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, StyleSheet, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

import { Color, FontFamily, FontSize } from '../GlobalStyles';

function RegistrationScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = React.useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Erro ao fazer o registo' + (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView>
        <View style={styles.largeTopAppBar}>
          <Text style={styles.largeTopAppBar__title}>Audio App</Text>
        </View>
        <View style={styles.inputFullName}>
          <TextInput
            style={styles.inputText}
            placeholder="Nome completo"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        <View style={styles.inputEmail}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputPassword}>
          <TextInput
            style={styles.inputText}
            placeholder="Palavra-passe"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputConfirmPassword}>
          <TextInput
            style={styles.inputText}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
          <>
            <Pressable style={styles.loginButton} onPress={signUp}>
              <Text style={styles.loginButton__text}>Criar conta</Text>
            </Pressable>
          </>
        }
        <View style={styles.pressableText}>
          <Pressable onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.pressableText__text}>Já tem uma conta?</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </LinearGradient >
  );
}

function alert(_arg0: string) {
  throw new Error('Function not implemented.');
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
  inputFullName: {
    marginTop: 40,
    marginHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Color.colorHalfWhite,
    borderStyle: 'solid',
    borderColor: Color.colorGray_100,
    borderWidth: 2,
    height: 56,
  },
  inputEmail: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Color.colorHalfWhite,
    borderStyle: 'solid',
    borderColor: Color.colorGray_100,
    borderWidth: 2,
    height: 56,
  },
  inputPassword: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Color.colorHalfWhite,
    borderStyle: 'solid',
    borderColor: Color.colorGray_100,
    borderWidth: 2,
    height: 56,
  },
  inputConfirmPassword: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Color.colorHalfWhite,
    borderStyle: 'solid',
    borderColor: Color.colorGray_100,
    borderWidth: 2,
    height: 56,
  },
  inputText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  pressableText: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pressableText__text: {
    fontSize: FontSize.size_base,
    letterSpacing: 0.2,
    lineHeight: 20,
    fontWeight: '600',
    fontFamily: FontFamily.interSemiBold,
    color: '#4b5649',
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 40,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 40,
    backgroundColor: Color.colorGray_100,
  },
  loginButton__text: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorHalfWhite,
  },
});

export default RegistrationScreen;

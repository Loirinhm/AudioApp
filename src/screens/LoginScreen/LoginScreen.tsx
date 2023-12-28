/* eslint-disable prettier/prettier */
import React from 'react';
import { FIREBASE_AUTH } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView, View, StyleSheet, Text, TextInput, ActivityIndicator, Pressable } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { Color, FontFamily, FontSize } from '../GlobalStyles';

function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('Erro ao fazer login' + (error as any).message);
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
          <Text style={styles.largeTopAppBar__title}>App Name</Text>
        </View>
        <View style={styles.inputEmail}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor={Color.colorGray_100}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputPassword}>
          <TextInput
            style={styles.inputText}
            placeholder="Palavra-passe"
            placeholderTextColor={Color.colorGray_100}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.pressableText}>
          <Pressable>
            <Text style={styles.pressableText__text}>Esqueceu a palavra-passe?</Text>
          </Pressable>
        </View>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
          <>
            <Pressable style={styles.loginButton} onPress={signIn}>
              <Text style={styles.loginButton__text}>Login</Text>
            </Pressable>
          </>
        }
        <View>
          <Pressable onPress={() => navigation.navigate('RegistrationScreen')}>
            <Text style={styles.pressableText__text}>Registe-se</Text>
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
  inputEmail: {
    marginTop: 40,
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
    justifyContent: 'space-between',
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

export default LoginScreen;

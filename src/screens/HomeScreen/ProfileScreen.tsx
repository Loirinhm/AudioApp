/* eslint-disable prettier/prettier */
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Color, FontFamily, FontSize } from '../GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen() {
  const navigation = useNavigation();
  const home = (<Icon name="home" size={24} color="#18181a" />)
  const profile = (<Icon name="user" size={24} color="#18181a" />);

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.mediumTopAppBar}>
        <Text style={styles.mediumTopAppBar__title}>Perfil</Text>
      </View>
      <View style={styles.body}>

      </View>
      <View style={styles.bottomMenu}>
        <Pressable style={styles.bottonMenu__unselected} onPress={() => navigation.navigate('HomeScreen')}>
          {home}
        </Pressable>
        <Pressable style={styles.bottonMenu__selected}>
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
    backgroundColor: 'red',
  },
  addButton: {
    borderRadius: 100,
    width: '100%',
    height: 56,
    marginTop: 40,
    backgroundColor: Color.colorGray_100,
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

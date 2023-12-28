/* eslint-disable prettier/prettier */
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView, View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { Color, FontFamily, FontSize } from '../GlobalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

function HomeScreen() {
  const navigation = useNavigation();
  const profile = (<Icon.Button name="user" backgroundColor="#18181a" onPress={() => navigation.navigate('ProfileScreen')} />);

  return (
    <LinearGradient
      style={styles.background}
      colors={['#5e5e5e', '#9a9a9a', '#5e5e5e']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView>
        <View style={styles.largeTopAppBar}>
          <Text style={styles.largeTopAppBar__title}>Áudios</Text>
        </View>
        <View style={styles.body}>
          <Pressable style={styles.addButton}>
            <Text>Adicionar áudios</Text>
          </Pressable>
        </View>
        <View style={styles.bottomMenu}>
          <Text>Recentes</Text>

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
    height: 112,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 20,
  },
  largeTopAppBar__title: {
    marginTop: 32,
    fontSize: FontSize.size_9xl,
    letterSpacing: 0.3,
    lineHeight: 36,
    fontFamily: FontFamily.interBold,
    color: Color.colorGray_100,
  },
  body: {
    paddingHorizontal: 16,
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
    justifyContent: 'space-evenly',
  },
  bottonMenu__selected: {
    borderRadius: 16,
    backgroundColor: Color.colorGreen,
    width: 64,
  },
});

export default HomeScreen;

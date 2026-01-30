import { Stack } from 'expo-router';
import { View, ImageBackground, StyleSheet } from 'react-native';

import { HeroAndDifficultyContextProvider } from '../src/context/HeroAndDifficultyContext';

export default function Layout () {
  return (
    <HeroAndDifficultyContextProvider>
      <ImageBackground
        source={require('../assets/images/background-img.png')}
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        <View style={styles.overlay}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' }
            }}
          />
        </View>
      </ImageBackground>
    </HeroAndDifficultyContextProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }
});
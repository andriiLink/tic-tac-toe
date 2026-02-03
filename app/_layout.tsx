import { useKeepAwake } from 'expo-keep-awake';
import { Stack } from 'expo-router';
import { Dimensions, ImageBackground, Platform, StatusBar, StyleSheet, View } from 'react-native';

import { HeroAndDifficultyContextProvider } from '../src/context/HeroAndDifficultyContext';

export default function Layout() {
  useKeepAwake();

  const isWeb = Platform.OS === 'web';

  return (
    <HeroAndDifficultyContextProvider>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/background-img.png')}
          resizeMode="cover"
          style={[
            styles.container,
            { minHeight: isWeb ? '100vh' : '100%' } as any
          ]}
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
      </View>
    </HeroAndDifficultyContextProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    width: '100%',
    height: '100%',
    // zIndex: 2,
  },

  container: {
    alignSelf: 'stretch',
    backgroundColor: 'red',
    flex: 1,
    // minHeight: Platform.OS === 'web' ? windowHeight : '100%',
    // minHeight: (Platform.OS === 'web' ? '100vh' : '100%') as any,
    position: 'relative',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }
});
import { Stack } from 'expo-router';

import { HeroAndDifficultyContextProvider } from '../src/context/HeroAndDifficultyContext';

export default function Layout () {
  return (
    <HeroAndDifficultyContextProvider>
      <Stack
        screenOptions={{ headerShown: false}}
      />
    </HeroAndDifficultyContextProvider>
  );
};
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';
import { GoBackButton } from '../src/components/GoBackButton';

export default function DifficultySelect () {
  const { setDifficulty } = useHeroAndDifficulty();

  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <View>
      <View>
        <View>
          <GoBackButton backPath={'/HeroSelectScreen'} />
        </View>
        <Text>Choose the difficulty</Text>
        {
          difficulties.map((item) => {
            return (
              <View key={item}>
                <Pressable
                  onPress={() => {
                    setDifficulty(item);
                    router.push('/GameScreen')
                  }}
                >
                  <Text>{item}</Text>
                </Pressable>
              </View>
            );
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  goBackButtonWrapper: {

  },
});

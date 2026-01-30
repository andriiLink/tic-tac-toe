import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';

export default function DifficultySelect () {
  const { setDifficulty } = useHeroAndDifficulty();

  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <View>
      <View>
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
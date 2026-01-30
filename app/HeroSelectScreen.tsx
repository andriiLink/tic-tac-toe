import { useRouter } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';

import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';

const heroes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const router = useRouter();

export default function HeroSelectScreen () {
  const { setHeroId } = useHeroAndDifficulty();

  return (
    <View>
      <View>
        <Text>Select the hero</Text>
        <ScrollView
          horizontal={true}
        >
          {heroes.map(item => {
            return (
              <View key={item}>
                <Pressable
                  onPress={() => {
                    setHeroId(item);
                    console.log(item);
                    router.push('/DifficultySelectScreen');
                  }}
                >
                  <Text>{item}</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

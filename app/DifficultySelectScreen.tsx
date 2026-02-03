import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';
import { GoBackButton } from '../src/components/GoBackButton';

export default function DifficultySelect() {
  const { setDifficulty } = useHeroAndDifficulty();

  // const difficulties = ['easy', 'medium', 'hard'];
  const difficulties = [
    {
      level: 'easy',
      boxColor: 'green',
    },
    {
      level: 'medium',
      boxColor: 'yellow',
    },
    {
      level: 'hard',
      boxColor: 'red',
    },
  ];

  return (
    <View style={styles.container}>
      <GoBackButton backPath={'/HeroSelectScreen'} />
      <View style={styles.contentWrapper}>
        <View style={styles.chooseDifficultyWrapper}>
          <Text style={styles.chooseDifficultyText}>Choose the difficulty</Text>
        </View>
        <View style={styles.difficultyList}>
          {
            difficulties.map((item) => {
              return (
                <TouchableOpacity
                  key={item.level}
                  style={{
                    backgroundColor: item.boxColor,
                    paddingVertical: 30,
                    paddingHorizontal: 50,
                    borderRadius: 30,
                  }}
                  onPress={() => {
                    setDifficulty(item.level);
                    router.push('/GameScreen')
                  }}
                >
                  <Text style={styles.listItemText}>{item.level}</Text>
                </TouchableOpacity>
              );
            })
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentWrapper: {
    alignItems: 'center',
  },

  chooseDifficultyText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 800,
  },

  chooseDifficultyWrapper: {
    padding: 30,
  },

  difficultyList: {
    flexDirection: 'row',
    gap: 20,
  },

  listItemText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 800,
  },
});

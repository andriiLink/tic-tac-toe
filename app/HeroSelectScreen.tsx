import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, Pressable, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';
import { HEROES } from '../src/constants/heroes';
import { HeroRoundIcon } from '../src/components/HeroRoundIcon';
import { GoBackButton } from '../src/components/GoBackButton';
// import { HeroType } from '@/src/types/HeroType';

const router = useRouter();
const { width, height } = useWindowDimensions();

export default function HeroSelectScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setHero } = useHeroAndDifficulty();

  const ITEM_WIDTH = 150;

  const onScroll = (event: any) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / ITEM_WIDTH);
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBackButtonWrapper}>
        <GoBackButton backPath={'/'} />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.selectHeroTextWrapper}>
          <Text style={styles.text}>Select the hero</Text>
        </View>
        <FlatList
          data={HEROES}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          style={styles.flatList}
          snapToInterval={ITEM_WIDTH}
          decelerationRate='fast'
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: (width / 2) - (ITEM_WIDTH / 2) }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  setHero(item);
                  console.log(item.name);
                  router.push('/DifficultySelectScreen');
                }}
              >
                <HeroRoundIcon hero={item} isActive={index === activeIndex} />
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentWrapper: {
    justifyContent: 'center',
  },

  flatList: {
    paddingVertical: 40,
  },

  goBackButtonWrapper: {
  },

  selectHeroTextWrapper: {
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 800,
  },
});

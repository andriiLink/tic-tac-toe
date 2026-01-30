import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, FlatList, Pressable } from 'react-native';

import { useHeroAndDifficulty } from '../src/hooks/useHeroAndDifficulty';
import { HEROES } from '../src/constants/heroes';
import { HeroRoundIcon } from '../src/components/HeroRoundIcon'
import { HeroType } from '@/src/types/HeroType';

const router = useRouter();

export default function HeroSelectScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setHeroId } = useHeroAndDifficulty();

  const ITEM_WIDTH = 150;

  const onScroll = (event: any) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / ITEM_WIDTH);
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <View>
      <View>
        <Text>Select the hero</Text>
        <FlatList
          data={HEROES}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          snapToInterval={ITEM_WIDTH}
          decelerationRate='fast'
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: (300 - ITEM_WIDTH) / 2 }}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onPress={() => {
                  setHeroId(item.id);
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

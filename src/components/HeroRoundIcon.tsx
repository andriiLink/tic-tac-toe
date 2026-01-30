import React, { useEffect, useRef } from 'react';
import { Animated, View, Image, StyleSheet } from 'react-native';

import { HeroType } from '../types/HeroType';

type Props = {
  hero: HeroType,
  isActive: boolean,
};

export const HeroRoundIcon: React.FC<Props> = ({ hero, isActive }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isActive ? 1.3 : 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, [isActive])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.heroImgWrapper, { transform: [{ scale }] }]}>
        <Image source={hero.imgSource} style={styles.heroImage } />
      </Animated.View>

      {isActive && (
        <Animated.Text style={styles.nameText}>
          {hero.name}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150, 
    alignItems: 'center',
    justifyContent: 'center'
  },

  heroImgWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
    backgroundColor: '#1a2a6c',
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },

  nameText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
});

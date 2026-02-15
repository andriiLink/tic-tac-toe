import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

import { HeroType } from '../types/HeroType';

const { height } = useWindowDimensions();

type Props = {
  modalVisible: boolean,
  onChangeVisible: Dispatch<SetStateAction<boolean>>,

  winner: string | null,
  hero: HeroType | null,
  enemy: HeroType | null,
  
  onResetGame: () => void,
};

export const WinLoseDrawModal: React.FC<Props> = ({ 
      modalVisible, 
      onChangeVisible, 
      winner, 
      hero,
      enemy,
      onResetGame
    }) => {
  return (
    <Modal
        animationType='slide'
        transparent={true}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
        visible={modalVisible}

        onRequestClose={() => onChangeVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalWindow}>
            <View>
              <Text 
                style={styles.resultText}
              >
                {winner === hero ? 'You win!' : winner === enemy ? 'You lose(' : 'Draw'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onResetGame();
                onChangeVisible(false);
              }}
            >
              <Text style={styles.btnText}>Play again!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onResetGame();
                router.push('/HeroSelectScreen');
                onChangeVisible(false);
              }}
            >
              <Text style={styles.btnText}>Change hero & difficulty</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onResetGame();
                router.push('/')
                onChangeVisible(false);
              }}
            >
              <Text style={styles.btnText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: 20,
    fontWeight: 500,
  },

  button: {
    width: '50%',
    height: '20%',

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 20,

    backgroundColor: '#fdf',

    marginBottom: height / 60,
  },

  modalWindow: {
    width: '50%',
    height: '40%',

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#faa',

    borderRadius: 40,
  },

  overlay: {
    flex: 1,

    backgroundColor: 'rgba(0, 0, 0, 0.7)',

    justifyContent: 'center',
    alignItems: 'center',
  },

  resultText: {
    fontSize: 30,
    fontWeight: 800,

    marginBottom: height / 30,
  },
});

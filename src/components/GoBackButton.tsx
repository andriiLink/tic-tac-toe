import React from 'react';
import { Href, useRouter } from 'expo-router';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

type Props = {
  backPath: Href,
}

export const GoBackButton: React.FC<Props> = ({ backPath }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.goBackButtonContainer}
      onPress={() => { router.push(backPath) }}
    >
      <Image
        source={require('../../assets/images/go-back-button.png')}
        style={styles.buttonImg}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goBackButtonContainer: {
    width: 100,
    height: 100,
  },

  buttonImg: {
    width: '100%',
    height: '100%',
  }
});


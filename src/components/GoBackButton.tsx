import React from 'react';
import { Href, useRouter } from 'expo-router';
import { View, Pressable, Image, StyleSheet } from 'react-native';

type Props = {
  backPath: Href,
}

export const GoBackButton: React.FC<Props> = ({ backPath }) => {
  const router = useRouter();

  return (
    <View style={styles.goBackButtonContainer} >
      <Pressable 
        onPress={() => {router.push(backPath)}}
      >
        <Image 
          source={require('../../assets/images/go-back-button.png')}
          style={styles.buttonImg}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goBackButtonContainer: {
    width: 10,
    height: 10,
  },

  buttonImg: {
    width: '100%',
    height: '100%',
  }
});


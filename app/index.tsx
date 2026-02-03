import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.playButtonWrapper}
        onPress={() => router.push('/HeroSelectScreen')}
      >
        <Text style={styles.text}>Play</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsButtonWrapper}
        onPress={() => router.push('/SettingsScreen')}
      >
        <Text style={styles.text}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 50,
  },

  playButtonWrapper: {
    backgroundColor: '#fcba03',
    borderColor: '#0320fc',
    borderWidth: 4,
    borderRadius: 10,

    paddingVertical: 20,
    paddingHorizontal: 40,
  },

  settingsButtonWrapper: {
    backgroundColor: '#fff',
    borderColor: '#0320fc',
    borderWidth: 4,
    borderRadius: 10,

    paddingVertical: 20,
    paddingHorizontal: 40,
  },

  text: {
    color: '#0320fc',
    fontWeight: 800,
    fontSize: 20,
  },
});

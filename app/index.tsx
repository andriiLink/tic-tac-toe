import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const router = useRouter();

export default function Page() {
  return (
    <View>
      <Pressable
        onPress={() => router.push('/HeroSelectScreen')}
      >
        <Text>Play</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});

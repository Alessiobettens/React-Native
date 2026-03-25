import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView } from "react-native";
import ProductCard from "./components/ProductCard.js";

import HomeScreen from "../screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {/* View als container */}
      <View style={styles.box}>
        <Text style={styles.title}>Core Components Demo</Text>
      </View>

      {/* Text */}
      <Text style={styles.text}>
        Dit is een voorbeeld van een Text component.
      </Text>

      {/* Image */}
      <Image
        style={styles.image}
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
      />

      {/* TextInput */}
      <TextInput style={styles.input} placeholder="Typ hier iets..." />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  box: {
    backgroundColor: "#ddd",
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

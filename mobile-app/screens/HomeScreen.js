import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Switch,
  StatusBar,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { Picker } from "@react-native-picker/picker"; // in Terminal: npm install @react-native-picker/picker

const categoryNames = {
  "": "Alle categorieen",
  "69b140079651590eda3cd9a0": "Overige hardare",
  "69b13fe9b66dafbc3735cb82": "Setup creation",
  "69b13f9646317a99c8e6d04e": "Computer accessoires",
  "69b13f74db90023a21e39c7d": "Gaming accessoires",
  "69b13f55eb1c4b229b77dc01": "Audio-appartuur",
  "69a84e888db69df76ba36d50": "Game Design",
  "69a84e73fb5b9fc1d646b3c7": "Esports&Community",
  "69a84e58acb12d9bb13c12c0": "Gaming News",
};

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/698c7fdf456b8dfa8347bfa3/products/69b1417e56363add1d1e1002", //url
      {
        headers: {
          Authorization:
            "Bearer 3183a4cd3ce8ae1bb0436da93bfbd564f7268ee4839a8bed5512543d25fe782a", //Token
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100,
            image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
            category:
              categoryNames[item.product.fieldData.category] ||
              "Onbekende categorie",
          })),
        );
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Alessio Bettens</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <StatusBar style="auto" />

      <Picker
        selectedValue={selectedCategory}
        onValueChange={setSelectedCategory}
        style={styles.picker}
      >
        <Picker.Item label="Alle categorieen" value="" />
        <Picker.Item label="Overige hardare" value="Overige hardare" />
        <Picker.Item label="Setup creation" value="Setup creation" />
        <Picker.Item
          label="Computer accessoires"
          value="Computer accessoires"
        />
        <Picker.Item label="Gaming accessoires" value="Gaming accessoires" />
        <Picker.Item label="Audio-appartuur" value="Audio-appartuur" />
        <Picker.Item label="Game Design" value="Game Design" />
        <Picker.Item label="Esports&Community" value="Esports&Community" />
        <Picker.Item label="Gaming News" value="Gaming News" />
      </Picker>

      <Picker
        selectedValue={sortOption}
        onValueChange={setSortOption}
        style={styles.picker}
      >
        <Picker.Item label="Prijs oplopend" value="price-asc" />
        <Picker.Item label="Prijs aflopend" value="price-desc" />
        <Picker.Item label="Naam: A-Z" value="name-asc" />
        <Picker.Item label="Naam: Z-A" value="name-desc" />
      </Picker>

      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          description={product.subtitle}
          price={product.price}
          image={product.image}
          onPress={() => navigation.navigate("Details", product)}
        />
      ))}

      <ProductCard
        title="Honda Civic"
        description="De krachtige honda"
        price="2000"
        image={require("../assets/images/honda.jpg")}
        onPress={() =>
          navigation.navigate("Details", {
            title: "Honda Civic",
            description: "De krachtige Honda",
            price: "2000",
            image: require("../assets/images/honda.jpg"),
          })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;

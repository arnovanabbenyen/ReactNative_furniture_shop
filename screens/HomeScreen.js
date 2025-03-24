import React, {useEffect, useState} from "react";
import { ScrollView, View, Text, StyleSheet, TextInput } from "react-native";
import ProductCard from "../components/ProductCard.js";
import { Picker } from "@react-native-picker/picker";

const categoryNames = {
  "" : "Alle categorieën",
  "67d6ef65ac7150f21a8e5778" : "Salontafels",
  "67d6eef832e54b05edf3f8fa" : "Fauteuils",
  "67d6eeaddb995e343ac767ea" : "Wandkasten",
  "67d6edc3fe53349ec5e0c44d" : "Eetkamerstoel",
  "67d6ecffe994495169160be5" : "Eettafel",
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/67a7d5bdbfa15f3fc3e17029/products",
      {
        headers: {
          Authorization:
          "Bearer 617f3ab81f0e29c762af61c9290ae8b5307cc8f51d45305820c2d87da6205d55",
        },
      }
    )
    .then((response) => response.json())
    .then((data) => {
      setProducts(data.items.map((item) => ({
        id: item.product.id,
        title: item.product.fieldData.name,
        subtitle: item.product.fieldData.description,
        price: (item.skus[0]?.fieldData.price.value || 0) / 100,
        image: {uri: item.skus[0]?.fieldData["main-image"]?.url},
        category: categoryNames[item.product.fieldData.category[0]] || "Onbekend",
      }))
    )
  })
    .catch(console.error);
  }, []);

  const filteredProducts = products.filter(
    (product) =>
    (selectedCategory === "" || product.category === selectedCategory) &&
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
  });

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Our Collection</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Zoek een model"
          placeholderTextColor={"#000"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.pickerContainer}>
          <Picker
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              style={styles.picker}
            >
            <Picker.item label="Alle categorieën" value="" />
            {[...new Set(products.map((product) => product.category))].map((category) => (
              <Picker.Item key={category} label={category} value={category} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sortOption}
            onValueChange={setSortOption}
            style={styles.picker}
          >
            <Picker.Item label="Prijs (laag - hoog" value="price-asc" />
            <Picker.Item label="Prijs (hoog - laag)" value="price-desc" />
            <Picker.Item label="Naam (A - Z)" value="name-asc" />
            <Picker.Item label="Naam (Z - A)" value="name-desc" />
          </Picker>
        </View>
        <ScrollView style={styles.cardContainer}>
          <View style={styles.row}>
          {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id}
            {...product}
            onPress={() => navigation.navigate("Details", product)}
          />
          ))}
          </View>
        </ScrollView>

        <ScrollView style={styles.cardContainer}>
          <View style={styles.row}>
          {sortedProducts.map((product) => (
          <ProductCard 
            key={product.id}
            {...product}
            onPress={() => navigation.navigate("Details", product)}
          />
          ))}
          </View>
        </ScrollView>
      </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingTop: 40,
      },
      heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
      },
      searchInput: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        color: "#000",
      },
      pickerContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        width: 242,
        paddingHorizontal: 24,
        alignSelf: "center",
        marginBottom: 20,
      },
      cardContainer: {
        width: "100%",
      },
      button: {
        fontSize: 16,
        color: "#007BFF",
        marginBottom: 16,
      },
      row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      },

    });

export default HomeScreen;
import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import ProductCard from "../components/productCard.js";

const categoryNames = {
  "": "Alle categorieën",
  "67d6ef65ac7150f21a8e5778": "Salontafels",
  "67d6eef832e54b05edf3f8fa": "Fauteuils",
  "67d6eeaddb995e343ac767ea": "Wandkasten",
  "67d6edc3fe53349ec5e0c44d": "Eetkamerstoel",
  "67d6ecffe994495169160be5": "Eettafel",
};

const sortOptions = [
  { label: "Prijs (laag - hoog)", value: "price-asc" },
  { label: "Prijs (hoog - laag)", value: "price-desc" },
  { label: "Naam (A - Z)", value: "name-asc" },
  { label: "Naam (Z - A)", value: "name-desc" },
];

const Products = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    fetch("https://api.webflow.com/v2/sites/67a7d5bdbfa15f3fc3e17029/products", {
      headers: {
        Authorization:
          "Bearer 617f3ab81f0e29c762af61c9290ae8b5307cc8f51d45305820c2d87da6205d55",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(
          data.items.map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            description: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100,
            image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
            category: categoryNames[item.product.fieldData.category[0]] || "Onbekend",
          }))
        );
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
    return 0;
  });

  const uniqueCategories = [
    "Alle categorieën",
    ...Array.from(
      new Set(
        products
          .map((p) => p.category)
          .filter(Boolean)
          .filter((c) => c !== "Alle categorieën")
      )
    ),
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Onze Collectie</Text>
      <View style={styles.filterRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Zoek een model"
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {uniqueCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === "" && category === "Alle categorieën"
                  ? styles.filterButtonActive
                  : selectedCategory === category
                  ? styles.filterButtonActive
                  : null,
              ]}
              onPress={() =>
                setSelectedCategory(category === "Alle categorieën" ? "" : category)
              }
            >
              <Text
                style={[
                  styles.filterButtonText,
                  (selectedCategory === "" && category === "Alle categorieën") ||
                  selectedCategory === category
                    ? styles.filterButtonTextActive
                    : null,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.sortContainer}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortButton,
                sortOption === option.value && styles.sortButtonActive,
              ]}
              onPress={() => setSortOption(option.value)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortOption === option.value && styles.sortButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              category={product.category}
              onPress={() => navigation.navigate("Details", product)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  filterRow: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 8,
  },
  categoryScroll: {
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: "#eee",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 2,
    marginBottom: 4,
  },
  filterButtonActive: {
    backgroundColor: "#000",
  },
  filterButtonText: {
    color: "#333",
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  sortContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  sortButton: {
    backgroundColor: "#eee",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 2,
    marginBottom: 4,
  },
  sortButtonActive: {
    backgroundColor: "#000",
  },
  sortButtonText: {
    color: "#333",
    fontSize: 14,
  },
  sortButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardContainer: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default Products;
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductCard = ({ image, title, description, price }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Vanaf €{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    backgroundColor: "#EDEDED",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
    price: {
        fontSize: 14,
        color:"#555",
        marginTop: 38,
    },
});

export default ProductCard;

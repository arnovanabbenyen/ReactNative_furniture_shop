import React, {useEffect, useState} from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard.js";

import odeChairImage from "../Images/ode_chair.png";
import houtenKastImage from "../Images/houten_kast.png";
import fauteuilsImage from "../Images/fauteuils.png";
import houtenTafelImage from "../Images/houten_tafel.png";

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

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
    .then((data) =>
      setProducts(data.items.map((item) => ({
        id: item.product.id,
        title: item.product.fieldData.name,
        subtitle: item.product.fieldData.description,
        price: (item.skus[0]?.fieldData.price.value || 0) / 100,
        image: {uri: item.skus[0]?.fieldData["main-image"]?.url},
      }))
    )
  )
    .catch((error) => console.error(error));
  }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.container}>
          <Text style={styles.heading}>Our Collection</Text>
          {products.map((product) => (
          <ProductCard 
            image={product.image}
            title={product.title}
            description={product.subtitle}
            price={product.price}
            onPress={() => navigation.navigate("Details", product)}
          />
          ))}
          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        justifyContent: 'center',
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
      button: {
        fontSize: 16,
        color: "#007BFF",
        marginBottom: 16,
      },
    });

export default HomeScreen;
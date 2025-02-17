import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ProductCard from "./components/ProductCard.js";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
      <Text style={styles.title}>Our Collection</Text>
      <ProductCard 
        image={require("./Images/ode_chair.png")}
        title="Ode Chair"
        description="zwart, orion taupe12"
        price= "399"
      />
      <ProductCard 
        image={require("./Images/houten_kast.png")}
        title="Modular Cabinet MC-5L"
        description="Eiken hardwax olie naturel light 3041"
        price="1759"
      />
      <ProductCard 
        image={require("./Images/fauteuils.png")}
        title="Co lounge chair"
        description="Eiken gerookt gebeitst, orion turtle88"
        price="889"
      />
      <ProductCard 
        image={require("./Images/houten_tafel.png")}
        title="Paste Eettafel"
        description="Eiken naturel lak, Eiken naturel lak"
        price="1909"
      />
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
import React, { useEffect, useState, useRef } from "react";
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import BlogCard from "../components/BlogCard.js";
import { Video } from "expo-av";

const categoryNames = {
  "": "Alle categorieën",
  "67d6ef65ac7150f21a8e5778": "Salontafels",
  "67d6eef832e54b05edf3f8fa": "Fauteuils",
  "67d6eeaddb995e343ac767ea": "Wandkasten",
  "67d6edc3fe53349ec5e0c44d": "Eetkamerstoel",
  "67d6ecffe994495169160be5": "Eettafel",
};

const SLIDE_INTERVAL = 4000;

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const intervalRef = useRef(null);
  const blogIntervalRef = useRef(null);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/sites/67a7d5bdbfa15f3fc3e17029/products", {
      headers: {
        Authorization: "Bearer 617f3ab81f0e29c762af61c9290ae8b5307cc8f51d45305820c2d87da6205d55",
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

  useEffect(() => {
    if (products.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }, SLIDE_INTERVAL);
      return () => clearInterval(intervalRef.current);
    }
  }, [products]);

  const currentProduct = products[currentIndex] || {};

  useEffect(() => {
    fetch("https://api.webflow.com/v2/collections/67bb3439e70e65d0638dff8d/items", {
      headers: {
        Authorization: "Bearer 617f3ab81f0e29c762af61c9290ae8b5307cc8f51d45305820c2d87da6205d55",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(
          data.items.map((item) => ({
            id: item.id,
            title: item.fieldData.name,
            summary: item.fieldData["post-summary"],
            image: { uri: item.fieldData["main-image"]?.url },
            body: item.fieldData["post-body"],
            publishedAt: item.createdOn,
          }))
        );
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (blogs.length > 1) {
      blogIntervalRef.current = setInterval(() => {
        setCurrentBlogIndex((prev) => (prev + 1) % blogs.length);
      }, SLIDE_INTERVAL);
      return () => clearInterval(blogIntervalRef.current);
    }
  }, [blogs]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.videoSection}>
        <Video
          source={{
            uri: "https://assets.studio-henk.nl/assets/Images/Stores/StudioHenk_StoresMix_website.mp4",
          }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          isLooping
          isMuted
          shouldPlay
        />
        <View style={styles.overlayContent}>
          <Text style={styles.heading}>Discover our new collection</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Products")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>View all products</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.subHeading}>Featured Products</Text>
        {currentProduct && currentProduct.image && (
          <View style={styles.carouselCard}>
            <Image source={currentProduct.image} style={styles.carouselImage} />
            <Text style={styles.carouselTitle}>{currentProduct.title}</Text>
            <Text style={styles.carouselCategory}>{currentProduct.category}</Text>
            <Text style={styles.carouselPrice}>Vanaf €{currentProduct.price}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("Products")}
          style={styles.carouselButton}
        >
          <Text style={styles.buttonText}>Discover more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.subHeading}>Latest Blogs</Text>
        <View style={styles.carouselCard}>
          {blogs.length > 0 && (
            <BlogCard
              key={blogs[currentBlogIndex].id}
              {...blogs[currentBlogIndex]}
              onPress={() => navigation.navigate("BlogDetail", blogs[currentBlogIndex])}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingTop: 0,
  },
  videoSection: {
    width: "100%",
    height: 820,
    position: "relative",
    justifyContent: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  overlayContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
    color: "#000",
    textAlign: "center",
  },
  carouselCard: {
    width: 300,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
  },
  carouselImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    backgroundColor: "#EDEDED",
    marginBottom: 8,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  carouselCategory: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
    marginBottom: 2,
    textAlign: "center",
  },
  carouselPrice: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
  },
  carouselButton: {
    backgroundColor: "#000",
    padding: 10,
    width: 200,
    alignSelf: "center",
    borderRadius: 20,
    marginBottom: 24,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
    width: 200,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

export default HomeScreen;
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BlogCard = ({ image, title, summary, publishedAt, onPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>
        {new Date(publishedAt).toLocaleDateString("nl-BE", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>
      <Text style={styles.description}>{summary}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.button}>Lees meer</Text>
      </TouchableOpacity>
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
    height: 200,
    borderRadius: 8,
    backgroundColor: "#EDEDED",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  button: {
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "#000000",
    padding: 8,
    borderRadius: 20,
    marginTop: 8,
    textAlign: "center",
  },
});

export default BlogCard;
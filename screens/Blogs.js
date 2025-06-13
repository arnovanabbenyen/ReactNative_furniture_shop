import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import BlogCard from "../components/BlogCard";

const sortOptions = [
  { label: "Nieuwste eerst", value: "newest" },
  { label: "Oudste eerst", value: "oldest" },
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
];

const BlogsScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

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
            image: { uri: item.fieldData["main-image"]?.url },
            title: item.fieldData.name,
            summary: item.fieldData["post-summary"],
            publishedAt: item.createdOn,
            body: item.fieldData["post-body"],
          }))
        );
      })
      .catch(console.error);
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.summary?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sort === "newest") return new Date(b.publishedAt) - new Date(a.publishedAt);
    if (sort === "oldest") return new Date(a.publishedAt) - new Date(b.publishedAt);
    if (sort === "az") return a.title.localeCompare(b.title);
    if (sort === "za") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Blogs</Text>
      <View style={styles.searchSortRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Zoek blogs..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.sortContainer}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.sortButton,
                sort === option.value && styles.sortButtonActive,
              ]}
              onPress={() => setSort(option.value)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sort === option.value && styles.sortButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.blogList}>
        {sortedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            title={blog.title}
            summary={blog.summary}
            publishedAt={blog.publishedAt}
            onPress={() => navigation.navigate("BlogDetail", blog)}
          />
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchSortRow: {
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
  blogList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default BlogsScreen;
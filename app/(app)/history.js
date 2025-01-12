import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HistoryPage = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Main"); // Navigate to Main.js
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>History</Text>
      </View>

      {/* Scrollable History Container */}
      <ScrollView contentContainerStyle={styles.historyContainer}>
        {/* Example History Entries */}
        {Array.from({ length: 20 }, (_, i) => (
          <View key={i} style={styles.historyItem}>
            <Text style={styles.historyText}>History Entry {i + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "gray",
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
  },
  navTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  historyContainer: {
    padding: 10,
  },
  historyItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, // Adds a shadow for Android
    shadowColor: "#000", // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
  },
  historyText: {
    fontSize: 16,
    color: "#333",
  },
});

export default HistoryPage;
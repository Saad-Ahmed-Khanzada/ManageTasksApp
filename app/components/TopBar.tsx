import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { ThemeContext } from "@/contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const TopBar: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, toggleTheme, colors } = themeContext;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.primary}
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Task Managing App</Text>
        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: colors.accent }]}
          onPress={toggleTheme}
        >
          <MaterialIcons
            name={theme === "dark" ? "light-mode" : "dark-mode"}
            size={20}
            color="white"
          />
          <Text style={[styles.toggleText, { color: colors.text2 }]}>
            {theme === "dark" ? "Light" : "Dark"} Mode
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  toggleText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
});

export default TopBar;

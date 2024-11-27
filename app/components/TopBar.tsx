import React, { useContext } from "react";
import { View, Text, Button, StatusBar } from "react-native";
import { ThemeContext } from "@/contexts/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const TopBar: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, toggleTheme, colors } = themeContext;

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.primary,
      }}
    >
      {/* Adjust StatusBar colors dynamically */}
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.primary}
      />
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.text, fontWeight: "bold", fontSize: 18 }}>
          Task Managing App
        </Text>
        <Button
          title={theme === "dark" ? "Light Mode" : "Dark Mode"}
          onPress={toggleTheme}
          color={colors.secondary}
        />
      </View>
    </SafeAreaView>
  );
};

export default TopBar;

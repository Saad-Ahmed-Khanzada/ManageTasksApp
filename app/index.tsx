import React, { useContext } from "react";
import { Link } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function Index() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <View className={`flex-1 items-center justify-center ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <Text className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
        Welcome to Task Managing App
      </Text>
      <TouchableOpacity
        className={`mt-4 p-3 rounded ${theme === "dark" ? "bg-gray-800" : "bg-blue-500"}`}
      >
        <Link href="(tabs)" className={`${theme === "dark" ? "text-gray-300" : "text-white"} font-bold`}>
          LETS GET STARTED
        </Link>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleTheme} className="mt-6">
        <Text className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
          Toggle Theme
        </Text>
      </TouchableOpacity>
    </View>
  );
}

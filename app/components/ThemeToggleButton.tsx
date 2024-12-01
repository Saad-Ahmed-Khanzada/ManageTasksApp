// import React, { useContext } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { ThemeContext } from "@/contexts/ThemeContext";
// import { MaterialIcons } from "@expo/vector-icons";

// const ThemeToggleButton: React.FC = () => {
//   const themeContext = useContext(ThemeContext);

//   if (!themeContext) {
//     throw new Error("ThemeContext must be used within a ThemeProvider");
//   }

//   const { theme, toggleTheme, colors } = themeContext;

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <Text style={[styles.currentTheme, { color: colors.text }]}>
//         Current Theme: {theme.toUpperCase()}
//       </Text>
//       <TouchableOpacity
//         style={[styles.toggleButton, { backgroundColor: colors.primary }]}
//         onPress={toggleTheme}
//       >
//         <MaterialIcons
//           name={theme === "dark" ? "light-mode" : "dark-mode"}
//           size={24}
//           color={colors.text}
//         />
//         <Text style={[styles.toggleText, { color: colors.text }]}>Toggle Theme</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   currentTheme: {
//     marginBottom: 20,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   toggleButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   toggleText: {
//     marginLeft: 8,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ThemeToggleButton;

import React, { useContext, useEffect, useRef } from "react";
import { Link,useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "@/contexts/ThemeContext";

export default function Index() {

  const navigation = useNavigation();

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { colors } = themeContext;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const navigationItems = [
    {  image: require("../assets/images/bitruptLogo.png") },
    {  image: require("../assets/images/bitruptLogo.png") },
    { image: require("../assets/images/bitruptLogo.png") },
    {image: require("../assets/images/bitruptLogo.png") },
  ];

  const angleIncrement = (2 * Math.PI) / navigationItems.length;
  const radius = Math.min(screenWidth, screenHeight) * 0.3;

  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 30000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${3 * Math.PI}rad`],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.logoContainer, { top: screenHeight * 0.37 }]}>
        <Image
          source={require("../assets/images/bitruptLogo.png")}
          style={[styles.logo, { width: screenWidth * 0.3, height: screenWidth * 0.3 }]}
        />
      </View>

      <Animated.View
        style={[
          styles.circularContainer,
          { transform: [{ rotate: rotateInterpolate }] },
        ]}
      >
        {navigationItems.map((item, index) => {
          const angle = index * angleIncrement;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.navItem,
                { transform: [{ translateX: x }, { translateY: y }] },
              ]}
            >
              <Image
                source={item.image}
                style={[styles.navImage, { width: screenWidth * 0.1, height: screenWidth * 0.1 }]}
              />
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      <Text
        style={{
          color: colors.text,
          fontSize: screenWidth * 0.05, 
          marginBottom: 10,
        }}
      >
        Welcome to Task Managing App
      </Text>


      <TouchableOpacity
  style={{
    marginTop: 16,
    backgroundColor: colors.primary,
    padding: screenWidth * 0.03,
    borderRadius: 8,
  }}
  onPress={() => navigation.navigate("Tabs")} 
>
  <Text
    style={{
      color: colors.text,
      fontWeight: "bold",
      textAlign: "center",
    }}
  >
    LET'S GET STARTED
  </Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circularContainer: {
    width: "100%",
    height: "55%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  navItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
    borderRadius: 50,
    padding: 16,
  },
  navImage: {
    marginBottom: 0,
    opacity: 0.7,
  },
});

import React, { useContext, useEffect, useRef } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/contexts/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

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
    { image: require("../assets/images/bitruptLogo.png"), label: "Tasks" },
    { image: require("../assets/images/bitruptLogo.png"), label: "Settings" },
    { image: require("../assets/images/bitruptLogo.png"), label: "Profile" },
    { image: require("../assets/images/bitruptLogo.png"), label: "Help" },
  ];

  const angleIncrement = (2 * Math.PI) / navigationItems.length;
  const radius = Math.min(screenWidth, screenHeight) * 0.3;

  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${2 * Math.PI}rad`],
  });

  return (
    <LinearGradient
      colors={[colors.accent, colors.primary, colors.secondary]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.welcomeText,
            { color: colors.text2, fontSize: screenWidth * 0.05 },
          ]}
        >
          Welcome to
        </Text>
        <Text
        className="text-white font-light text-center "
          style={[
            styles.appName,
            { fontSize: screenWidth * 0.07 },
          ]}
        >
          Task Managing App by Bitrupt
        </Text>
      </View>

      <View style={styles.circularContainer}>
        <Image
          source={require("../assets/images/bitruptLogo.png")}
          style={[
            styles.centerLogo,
            { width: screenWidth * 0.25, height: screenWidth * 0.25 },
          ]}
        />

        <Animated.View
          style={[
            styles.navItemsContainer,
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
                  {
                    transform: [{ translateX: x }, { translateY: y }],
                    backgroundColor: colors.secondary,
                    shadowColor: colors.text,
                  },
                ]}
              >
                <Image
                  source={item.image}
                  style={[
                    styles.navImage,
                    { width: screenWidth * 0.12, height: screenWidth * 0.12 },
                  ]}
                />
          
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate("Tabs")}
      >
        <MaterialIcons
          name="arrow-forward"
          size={24}
          color={colors.text}
          style={{ marginRight: 10 }}
        />
        <Text    className="text-white font-light text-center " style={[styles.startText, { color: colors.text }]}>
          LET'S GET STARTED
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  appName: {

    textTransform: "uppercase",
  },
  circularContainer: {
    position: "relative",
    width: "100%",
    height: "55%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  centerLogo: {
    position: "absolute",
    zIndex: 1,
    borderRadius: 100,
    opacity: 0.9,
  },
  navItemsContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  navItem: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    padding: 16,
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  navImage: {
    marginBottom: 5,
    borderRadius: 50,
  },
  navLabel: {
    fontWeight: "600",
    marginTop: 5,
    textAlign: "center",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  startText: {

    textAlign: "center",
    fontSize: 16,
  },
});

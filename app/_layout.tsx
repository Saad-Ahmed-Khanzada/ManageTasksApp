import React from "react";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import {store } from "../redux/store";
import { ThemeProvider } from "../contexts/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import ThemeToggleButton from "./components/ThemeToggleButton";
import TopBar from "./components/TopBar";
// import { PersistGate } from "redux-persist/integration/react";

export default function AppLayout() {
  return (
    <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}

      <ThemeProvider>
        
        <NavigationContainer>

        <TopBar />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "blue",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            {/* Define your screens */}
            <Stack.Screen name="index"  options={{ headerShown: false }}   />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />

            {/* <Stack.Screen name="tasklist" options={{ title: "Task List" }} /> */}
            {/* <Stack.Screen name="screens" options={{ headerShown: false }}  /> */}
          </Stack>
        </NavigationContainer>
      </ThemeProvider>
      {/* </PersistGate> */}

    </Provider>
  );
}

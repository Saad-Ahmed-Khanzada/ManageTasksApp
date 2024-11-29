import React from "react";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import {store } from "../redux/store";
import { ThemeProvider } from "../contexts/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import ThemeToggleButton from "./components/ThemeToggleButton";
import TopBar from "./components/TopBar";
import IndexScreen from "./index"; 
import TabsScreen from "./(tabs)/_layout";
import NotFoundScreen from "./+not-found"; 
import ArchivedTasksScreen from "./screens/archivescreen2"; 
import AddTaskScreen from "./(tabs)/addtask";
import { RootStackParamList } from "@/navigation";

const Stack = createStackNavigator<RootStackParamList>();



export default function AppLayout() {
  return (
    <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}

      <ThemeProvider>
        
        <NavigationContainer>

        <TopBar />
        <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "purple" },
              headerTintColor: "#fff",
              headerTitleStyle: { fontWeight: "bold" },
            }}
          >
            <Stack.Screen name="Index" component={IndexScreen}  options={{ headerShown: false }}   />
            <Stack.Screen name="Tabs" component={TabsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />

            <Stack.Screen name="ArchivedTasksScreen" component={ArchivedTasksScreen} options={{ headerShown: false }} />
            <Stack.Screen  name="NotFound" component={NotFoundScreen} options={{headerShown:false}}/>

           
            </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      {/* </PersistGate> */}

    </Provider>
  );
}

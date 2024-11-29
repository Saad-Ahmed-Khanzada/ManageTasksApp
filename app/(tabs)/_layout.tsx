import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import TaskListScreen from "./index";
import AddTaskScreen from "./addtask";

const Tab = createBottomTabNavigator();

export default function TabsScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 18,
          paddingTop: 5,
          height: 80,
        },
        tabBarIcon: ({ focused }) => {
          let icon;

          switch (route.name) {
            case "TaskList":
              icon = focused
                ? require("@/assets/images/taskList.png")
                : require("@/assets/images/taskList.png");
              break;
            case "AddTask":
              icon = focused
                ? require("@/assets/images/taskList.png")
                : require("@/assets/images/taskList.png");
              break;
          }

          return <Image source={icon} style={{ width: 25, height: 25 }} />;
        },
      })}
    >
      <Tab.Screen name="TaskList" component={TaskListScreen} />
      <Tab.Screen name="AddTask" component={AddTaskScreen} />
    </Tab.Navigator>
  );
}



// require("@/assets/images/taskList.png")
// require("@/assets/images/addTask.png")

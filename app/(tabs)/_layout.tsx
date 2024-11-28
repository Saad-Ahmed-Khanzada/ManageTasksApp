import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";


import Portfolio from "./addtask";

import TaskListScreen from ".";
import AddTaskScreen from "./addtask";
import { Image } from "react-native";


const Tab = createBottomTabNavigator();

const TabLayout: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 18,
          paddingTop: 5,
          height: 80,
        },
      }}
    >
  
      <Tab.Screen
        name="Task List Screen"
        component={TaskListScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ?  require("@/assets/images/taskList.png")
                  : require("@/assets/images/taskList.png")
              }
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddTaskScreen"
        component={AddTaskScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ?   require("@/assets/images/addTask.png")
                  :  require("@/assets/images/addTask.png")
              }
              style={{ width: 27, height: 27 }}
            />
          ),
        }}
     
      />
   
    </Tab.Navigator>
  );
};

export default TabLayout;

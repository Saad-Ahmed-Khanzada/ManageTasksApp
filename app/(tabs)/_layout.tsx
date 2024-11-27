import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";


import Portfolio from "./addtask";

import TaskListScreen from ".";
import AddTaskScreen from "./addtask";
// import TaskListScreen from "../screens/tasklist";

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
      
      />
      <Tab.Screen
        name="AddTaskScreen"
        component={AddTaskScreen}
     
      />
   
    </Tab.Navigator>
  );
};

export default TabLayout;

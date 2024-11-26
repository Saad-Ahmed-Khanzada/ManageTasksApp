import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from '../app/screens/tasklist';
import AddTaskScreen from '../app/screens/addtask';
import { ThemeProvider } from '../contexts/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Stack = createStackNavigator();

const AppLayout: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TaskList">
            <Stack.Screen name="TaskList" component={TaskListScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

export default AppLayout;

import React, { useContext } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { toggleCompletion, deleteTask } from '../../redux/slices/taskSlice';
import { ThemeContext } from '@/contexts/ThemeContext';

const TaskListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const themeContext = useContext(ThemeContext);
    const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <View className={`flex-1 ${theme === 'dark' ? 'bg-black' : 'bg-white'} p-4`}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border-b border-gray-300 pb-2 mb-2">
            <Text className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              {item.name} - {item.priority} - {item.completed ? 'Done' : 'Pending'}
            </Text>
            <Button title="Toggle" onPress={() => dispatch(toggleCompletion(item.id))} />
            <Button title="Delete" onPress={() => dispatch(deleteTask(item.id))} />
          </View>
        )}
      />
      <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
    </View>
  );
};

export default TaskListScreen;

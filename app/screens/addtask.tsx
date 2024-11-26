import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/slices/taskSlice';

const AddTaskScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [task, setTask] = useState({ name: '', priority: 'Low' });
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask({ ...task, id: Date.now().toString(), completed: false }));
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white p-4">
      <TextInput
        placeholder="Task Name"
        value={task.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
        className="border border-gray-300 rounded-md p-3 mb-4"
      />
      <Picker
        selectedValue={task.priority}
        onValueChange={(value) => setTask({ ...task, priority: value })}
        className="bg-gray-200 rounded-md mb-4"
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
};

export default AddTaskScreen;

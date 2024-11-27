import React, { useState, useContext } from "react";
import { View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";
import { ThemeContext } from "@/contexts/ThemeContext";

const AddTaskScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [task, setTask] = useState({ name: "", priority: "Low" });
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  const { colors } = themeContext;
  const handleAddTask = () => {
    dispatch(addTask({ ...task, id: Date.now().toString(), completed: false }));
    navigation.goBack();
  };

  return (
    <View className={`flex-1 p-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <TextInput
        placeholder="Task Name"
        placeholderTextColor={theme === "dark" ? "gray" : "black"}
        value={task.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
        className={`border rounded-md p-3 mb-4 ${theme === "dark" ? "border-gray-600 text-white" : "border-gray-300 text-black"}`}
      />
      <Picker
        selectedValue={task.priority}
        onValueChange={(value) => setTask({ ...task, priority: value })}
        className={`rounded-md mb-4 ${theme === "dark" ? "bg-primary text-red-500" : "bg-gray-200 text-red-600"}`
      }
      style={{
        backgroundColor: colors.primary,
        color: colors.text,
        marginBottom: 16,
      }}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>
      <Button title="Add Task" onPress={handleAddTask} color={theme === "dark" ? "gray" : "blue"} />
    </View>
  );
};

export default AddTaskScreen;

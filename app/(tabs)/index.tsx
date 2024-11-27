import React, { useContext } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleCompletion, deleteTask } from "../../redux/slices/taskSlice";
import { ThemeContext } from "@/contexts/ThemeContext";
import { selectSortedTasks } from "../../redux/slices/taskSlice";

const TaskListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme } = themeContext;

  const sortedTasks = useSelector(selectSortedTasks);


  return (
    <View className={`flex-1 p-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className={`border-b pb-2 mb-2 ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
            <Text className={`text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
              {item.name} - {item.priority} - {item.completed ? "Done" : "Pending"}
            </Text>
            <Button title="Toggle" onPress={() => dispatch(toggleCompletion(item.id))} color={theme === "dark" ? "gray" : "blue"} />
            <Button title="Delete" onPress={() => dispatch(deleteTask(item.id))} color="red" />
          </View>
        )}
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate("AddTaskScreen")}
        color={theme === "dark" ? "gray" : "blue"}
      />
    </View>
  );
};

export default TaskListScreen;

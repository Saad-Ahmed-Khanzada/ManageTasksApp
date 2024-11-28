import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";
import { ThemeContext } from "@/contexts/ThemeContext";

const AddTaskScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [task, setTask] = useState({
    name: "",
    priority: "Low" as "Low" | "Medium" | "High",
    dueDate: null as Date | null, 
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { colors } = themeContext;

  const handleAddTask = () => {
    dispatch(
      addTask({
        id: Date.now().toString(),
        name: task.name,
        priority: task.priority,
        completed: false,
        dueDate: task.dueDate ? task.dueDate.toISOString() : null,
      })
    );
    navigation.goBack();
  };
  

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setDatePickerVisible(false); 
    if (selectedDate) {
      setTask({ ...task, dueDate: selectedDate });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Add New Task</Text>

      <TextInput
        placeholder="Task Name"
        placeholderTextColor={colors.text}
        value={task.name}
        onChangeText={(text) => setTask({ ...task, name: text })}
        style={[
          styles.input,
          {
            borderColor: colors.text,
            color: colors.text,
          },
        ]}
      />

      <Picker
        selectedValue={task.priority}
        onValueChange={(value) => setTask({ ...task, priority: value })}
        style={[styles.picker, { backgroundColor: colors.primary, color: colors.text }]}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>

      <TouchableOpacity
        onPress={() => setDatePickerVisible(true)}
        style={[styles.button, { backgroundColor: colors.primary, marginBottom: 16 }]}
      >
        <Text style={{ color: colors.text, fontWeight: "bold" }}>
          {task.dueDate
            ? `Due Date: ${task.dueDate.toLocaleDateString()}`
            : "Select Due Date"}
        </Text>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <DateTimePicker
          value={task.dueDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity
        onPress={handleAddTask}
        style={[styles.button, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.text, fontWeight: "bold" }}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: Dimensions.get("window").width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: Dimensions.get("window").width * 0.04,
  },
  picker: {
    borderRadius: 8,
    marginBottom: 16,
    fontSize: Dimensions.get("window").width * 0.04,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AddTaskScreen;

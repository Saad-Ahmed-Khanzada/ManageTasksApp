import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { TextInput, Button, Text, Card } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";
import { ThemeContext } from "@/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient
      colors={[colors.primary, colors.accent,colors.primary]}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={[styles.title, { color: colors.accent }]}>
            Add New Task
          </Text>
          <TextInput
 placeholder="Task name"
  value={task.name}
  onChangeText={(text) => setTask({ ...task, name: text })}
  mode="outlined"
  style={[styles.input, { borderColor: colors.text ,color: colors.accent}]}
  theme={{
    colors: {

      background: colors.text2,
      
    },
  }}
/>

          <Picker
            selectedValue={task.priority}
            onValueChange={(value) => setTask({ ...task, priority: value })}
            style={[styles.picker, { color: colors.accent ,borderColor: colors.text}]}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
          <Button
            mode="outlined"
            onPress={() => setDatePickerVisible(true)}
            style={[styles.dateButton, { borderColor: colors.text }]}
            textColor={colors.accent}
          >
            {task.dueDate
              ? `Due Date: ${task.dueDate.toLocaleDateString()}`
              : "Select Due Date"}
          </Button>
          {isDatePickerVisible && (
            <DateTimePicker
              value={task.dueDate || new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <Button
            mode="contained"
            onPress={handleAddTask}
            style={[styles.addButton, { backgroundColor: colors.accent }]}
            textColor={colors.background}
          >
            Add Task
          </Button>
        </Card.Content>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  card: {
    borderRadius: 16,
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    
  },
  dateButton: {
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  addButton: {
    marginTop: 16,
    borderRadius: 8,
  },
});

export default AddTaskScreen;

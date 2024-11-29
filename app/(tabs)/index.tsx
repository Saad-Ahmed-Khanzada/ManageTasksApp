import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  toggleCompletion,
  deleteTask,
  archiveTasks,
  autoArchiveTasks,
} from "../../redux/slices/taskSlice";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
// import { Link } from "expo-router";

const TaskListScreen: React.FC= () => {
  
  const navigation = useNavigation(); 

  const themeContext = useContext(ThemeContext);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { colors } = themeContext;

  const screenWidth = Dimensions.get("window").width;


  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(autoArchiveTasks());
    }, 10000);

    return () => clearInterval(interval); 
  }, [dispatch]);

  const renderTask = ({ item }: any) => (
    <View style={[styles.taskCard, { backgroundColor: colors.background }]}>
      <Text
        style={[
          styles.taskText,
          { color: colors.text, fontSize: screenWidth * 0.045 },
        ]}
      >
        {item.name} - {item.priority} -{" "}
        <Text
          style={{
            color: item.completed ? "green" : "orange",
            fontWeight: "bold",
          }}
        >
          {item.completed ? "Completed" : "Pending"}
        </Text>
      </Text>
      <Text style={{ color: colors.text, marginBottom: 8 }}>
  Due Date:{" "}
  {item.dueDate ? new Date(item.dueDate).toLocaleDateString() : "No due date"}
</Text>


      <View style={styles.taskActions}>
        <TouchableOpacity
          onPress={() => dispatch(toggleCompletion(item.id))}
          style={[
            styles.actionButton,
            { backgroundColor: colors.primary, marginRight: 8 },
          ]}
        >
          <Text style={{ color: colors.text, fontWeight: "bold" }}>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(deleteTask(item.id))}
          style={[styles.actionButton, { backgroundColor: "red" }]}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text
        style={[
          styles.screenTitle,
          { color: colors.text, fontSize: screenWidth * 0.06 },
        ]}
      >
        Task List
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.taskList}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              color: colors.text,
              marginTop: 20,
              fontSize: screenWidth * 0.045,
            }}
          >
            No tasks available. Please add a new task.
          </Text>
        }
      />

<TouchableOpacity
        onPress={() => navigation.navigate("AddTask")} 
        style={[styles.mainButton, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.text, fontWeight: "bold" }}>Add Task</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => dispatch(archiveTasks())}
        style={[styles.mainButton, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.text, fontWeight: "bold" }}>
          Archive Completed Tasks
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ArchivedTasksScreen")} style={[styles.mainButton, { backgroundColor: colors.primary }]}>
        {/* <Link
          href="/screens/archivescreen2"
          style={{
            color: colors.text,
            fontWeight: "bold",
            textAlign: "center",
          }}
        > */}
          <Text  style={{
            color: colors.text,
            fontWeight: "bold",
            textAlign: "center",
          }}>View Archived Tasks</Text>
        {/* </Link> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  screenTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskList: {
    paddingBottom: 16,
  },
  taskCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, 
  },
  taskText: {
    marginBottom: 12,
    fontWeight: "bold",
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    borderRadius: 8,
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  mainButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default TaskListScreen;

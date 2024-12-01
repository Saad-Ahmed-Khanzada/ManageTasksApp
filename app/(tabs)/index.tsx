import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Button, Text, Divider } from "react-native-paper";
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
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { colors } = themeContext;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(autoArchiveTasks());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const renderTask = ({ item }: any) => (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: colors.primary,
          shadowColor: colors.accent,
    
        },
      ]}
    >
      <Card.Content>
        <Text style={[styles.taskTitle, { color: colors.text }]}>
          {item.name}
        </Text>
        <Divider style={styles.divider} />

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={[styles.label, { color: colors.accent }]}>Priority</Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {item.priority}
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={[styles.label, { color: colors.accent }]}>Status</Text>
            <Text
              style={[
                styles.value,
                {
                  color: item.completed ? "green" : "red",
                  fontWeight: "bold",
                },
              ]}
            >
              {item.completed ? "Completed" : "Pending"}
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={[styles.label, { color: colors.accent }]}>
              Due Date
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {item.dueDate
                ? new Date(item.dueDate).toLocaleDateString()
                : "No due date"}
            </Text>
          </View>
        </View>

        <View style={styles.taskActions}>
          <Button
            mode="outlined"
            textColor={colors.accent}
            onPress={() => dispatch(toggleCompletion(item.id))}
            style={[
              styles.actionButton,
              { borderColor: colors.accent, marginRight: 8 },
            ]}
            icon={() => (
              <MaterialIcons name="done" size={16} color={colors.accent} />
            )}
          >
            Toggle
          </Button>
          <Button
            mode="contained"
            buttonColor="red"
            textColor="white"
            onPress={() => dispatch(deleteTask(item.id))}
            icon={() => <MaterialIcons name="delete" size={16} color="white" />}
          >
            Delete
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <LinearGradient
      colors={[colors.accent,colors.primary]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: "#ffff" }]}>
          Task List
        </Text>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => navigation.navigate("AddTask")}
          style={[
            styles.addTaskButton,
            { backgroundColor: colors.secondary, textColor: colors.text },
          ]}
        >
          Add Task
        </Button>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name="playlist-add"
              size={48}
              color="#ffff"
            />
            <Text style={[styles.emptyText, { color: "#ffff" }]}>
              No tasks available. Please add a new task.
            </Text>
          </View>
        }
      />

      <View style={styles.bottomActions}>
        <Button
        
          mode="outlined"
          onPress={() => navigation.navigate("ArchivedTasksScreen")}
          style={[styles.archiveButton, { borderColor: colors.text }]}
          textColor={colors.text}
        >
          View Archived Tasks
        </Button>

        <Button
          mode="outlined"
          onPress={() => dispatch(archiveTasks())}
          style={[
            styles.archiveCompletedButton,
            { borderColor: colors.text },
          ]}
          textColor={colors.text}
        >
          Archive Completed Tasks
        </Button>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    marginBottom: 12,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 10,
    padding: 2,
    elevation: 4,
    shadowRadius: 5,

    
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 1,
  },
  gridItem: {
    flexBasis: "33%",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  value: {
    fontSize: 13,
    opacity: 0.9,
    textAlign: "center",
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
  },
  divider: {
    marginVertical: 8,
    backgroundColor: "#ccc",
  },
  addTaskButton: {
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  bottomActions: {
    marginTop: 10,
    alignItems: "center",
  },
  archiveButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 50,
    marginBottom: 10,
    fontWeight:"light"
  },
  archiveCompletedButton: {
    paddingHorizontal: 50,
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});

export default TaskListScreen;

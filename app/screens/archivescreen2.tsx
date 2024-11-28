import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ThemeContext } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

const ArchivedTasksScreen: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  const archivedTasks = useSelector(
    (state: RootState) => state.tasks.archivedTasks
  );

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { colors } = themeContext;

  const screenWidth = Dimensions.get("window").width;

  const renderTask = ({ item }: any) => (
    <View style={[styles.taskCard, { backgroundColor: colors.background }]}>
      <Text
        style={[
          styles.taskName,
          { color: colors.text, fontSize: screenWidth * 0.045 },
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.taskPriority,
          {
            color: item.priority === "High" ? "red" : colors.text,
            fontSize: screenWidth * 0.04,
          },
        ]}
      >
        Priority: {item.priority}
      </Text>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: "Archived Tasks" }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text
          style={[
            styles.screenTitle,
            { color: colors.text, fontSize: screenWidth * 0.06 },
          ]}
        >
          Archived Tasks
        </Text>

        <FlatList
          data={archivedTasks}
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
              No archived tasks available.
            </Text>
          }
        />
      </View>
    </>
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
  taskName: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  taskPriority: {
    fontWeight: "600",
  },
});

export default ArchivedTasksScreen;

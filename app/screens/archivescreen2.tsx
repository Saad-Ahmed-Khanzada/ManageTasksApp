import React, { useContext } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Card, Text, Button, Divider, Chip } from "react-native-paper";

const ArchivedTasksScreen: React.FC = () => {
  const navigation = useNavigation();
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
    <Card
      style={[
        styles.taskCard,
        {
          backgroundColor: colors.primary,
          shadowColor: colors.accent,
        },
      ]}
    >
      <Card.Content>
        <View style={styles.taskHeader}>
          <Text
            style={[
              styles.taskName,
              { color: colors.text, fontSize: screenWidth * 0.045 },
            ]}
          >
            Task Name:
          </Text>
          <Chip style={[styles.chip, { backgroundColor: colors.secondary }]}>
            <Text style={{ color: colors.text }}>{item.name}</Text>
          </Chip>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.taskDetails}>
          <View style={styles.detailItem}>
            <Text style={[styles.label, { color: colors.accent }]}>
              Priority:
            </Text>
            <Text
              style={[
                styles.value,
                {
                  color: item.priority === "High" ? "red" : colors.text,
                  fontWeight: "bold",
                },
              ]}
            >
              {item.priority}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.label, { color: colors.accent }]}>Status:</Text>
            <Text
              style={[
                styles.value,
                {
                  color: "green",
                  fontWeight: "bold",
                },
              ]}
            >
              Archived
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        icon="arrow-left"
        style={[styles.backButton]}
        textColor={colors.text}
      />
   
      

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
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No archived tasks available.
            </Text>
          </View>
        }
      />
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
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowRadius: 4,
    padding: 12,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  chip: {
    marginLeft: 8,
    paddingHorizontal: 8,
  },
  taskDetails: {
    marginTop: 12,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  divider: {
    marginVertical: 8,
  },
  backButton: {
    padding: 1,
    borderRadius: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
  },
});

export default ArchivedTasksScreen;

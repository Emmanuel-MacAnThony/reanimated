import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import ListItem from "./components/ListItem";

const TITLES = [
  "Record the dismissible tutorial 🎥",
  "Leave 👍🏼 to the video",
  "Check YouTube comments",
  "Subscribe to the channel 🚀",
  "Leave a ⭐️ on the GitHub Repo",
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));

const BACKGROUND_COLOR = "#FAFBFF";

export default function App() {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => {
      return tasks.filter((item) => item.index !== task.index);
    });
  }, []);

  const scrollRef = useRef(null);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Text style={styles.title}>Tasks</Text>
        <ScrollView
          style={{ flex: 1, backgroundColor: "#fff" }}
          ref={scrollRef}
        >
          {tasks.map((task, idx) => {
            return (
              <ListItem
                key={task.index.toString()}
                task={task}
                onDismiss={onDismiss}
                simultaneousHandlers={scrollRef}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },

  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: "5%",
  },
});

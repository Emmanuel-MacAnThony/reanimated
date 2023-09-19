import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import React from "react";
import ListItem from "./components/ListItem";
import { useSharedValue } from "react-native-reanimated";

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

export default function App() {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <View style={styles.container}>
      <StatusBar />
      <FlatList
        contentContainerStyle={{ paddingTop: 40 }}
        data={data}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

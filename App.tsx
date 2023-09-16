import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

export const LIST_ITEM_COLOR = "#1798DE";

interface Item {
  id: number;
}

// new Array(5).fill(0).map((_, idx) => { return { id: idx };})

const App = () => {
  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, idx) => {
      return { id: idx };
    })
  );

  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  const onAdd = useCallback(() => {
    setItems((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, { id: nextItemId }];
    });
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"transparent"} />
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <Text style={{ color: "white", fontSize: 40 }}>+</Text>
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 50 }}
      >
        {items.map((item, idx) => {
          return (
            <Animated.View
              entering={initialMode.current ? FadeIn.delay(100 * idx) : FadeIn}
              exiting={FadeOut}
              style={styles.listItem}
              key={item.id}
              onTouchEnd={() => onDelete(item.id)}
              layout={Layout.delay(100)}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: "black",
    borderRadius: 40,
    position: "absolute",
    bottom: 50,
    right: "5%",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    width: "90%",
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
});

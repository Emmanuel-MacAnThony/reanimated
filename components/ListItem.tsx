import { StyleSheet, Text, View, ViewToken } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface IProps {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
}

const ListItem: React.FC<IProps> = ({ viewableItems, item }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id)
    );
    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.6) }],
    };
  });

  return <Animated.View style={[styles.listItem, rStyle]} />;
};

const styles = StyleSheet.create({
  listItem: {
    height: 80,
    width: "90%",
    backgroundColor: "#78CAD2",
    marginTop: 20,
    borderRadius: 15,
    alignSelf: "center",
  },
});

export default ListItem;

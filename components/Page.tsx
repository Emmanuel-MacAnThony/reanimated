import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PageProps {
  index: number;
  title: string;
  translateX: SharedValue<number>;
}

const { width: PAGE_WIDTH } = Dimensions.get("window");

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `rgba(0,0,256, 0.${index + 2})`,
          ...StyleSheet.absoluteFillObject,
        },
        rStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 70,
          fontWeight: "700",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export { PAGE_WIDTH };
export default Page;

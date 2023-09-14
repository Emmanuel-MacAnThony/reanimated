import "react-native-gesture-handler";
import React, { useRef, useCallback } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  View,
  Text,
  ImageBackground,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import Page, { PAGE_WIDTH } from "./components/Page";

const titles = ["whats", "up", "mobile", "devs"];

type ContextType = {
  x: number;
};

export default function App() {
  const translateX = useSharedValue(0);
  const clampedTranslateX = useDerivedValue(() => {
    const MAX_TRANSLATE_X_VALUE = -PAGE_WIDTH * (titles.length - 1);
    return Math.max(Math.min(translateX.value, 0), MAX_TRANSLATE_X_VALUE);
  });

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, context) => {
      context.x = clampedTranslateX.value;
      cancelAnimation(translateX);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: (event) => {
      translateX.value = withDecay({ velocity: event.velocityX });
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar />
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={{ flex: 1, flexDirection: "row" }}>
            {titles.map((title, index) => {
              return (
                <Page
                  key={index.toString()}
                  index={index}
                  title={title}
                  translateX={clampedTranslateX}
                />
              );
            })}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

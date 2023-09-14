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
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: SIZE } = Dimensions.get("window");

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function App() {
  const doubleTapRef = useRef();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const rTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar />
        <TapGestureHandler onActivated={onSingleTap} waitFor={doubleTapRef}>
          <TapGestureHandler
            maxDelayMs={250}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}
          >
            <Animated.View>
              <ImageBackground
                style={styles.image}
                source={require("./assets/image.jpeg")}
              >
                <AnimatedImage
                  source={require("./assets/heart.png")}
                  style={[
                    styles.image,
                    {
                      shadowOffset: { width: 0, height: 20 },
                      shadowOpacity: 0.3,
                      shadowRadius: 35,
                    },
                    rStyle,
                  ]}
                  resizeMode="center"
                />
              </ImageBackground>
              <Animated.Text style={[styles.turtles, rTextStyle]}>
                🐢🐢🐢🐢
              </Animated.Text>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: SIZE,
    height: SIZE,
  },
  turtles: { fontSize: 40, textAlign: "center", marginTop: 30 },
});

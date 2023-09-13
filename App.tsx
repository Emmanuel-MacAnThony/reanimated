import "react-native-gesture-handler";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Switch,
  Dimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#F8F8F8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: "rgba(256,0,256,0.2)",
  false: "rgba(0,0,0,0.1)",
};

const SIZE = Dimensions.get("window").width * 0.7;

type Theme = "light" | "dark";

export default function App() {
  const [theme, setTheme] = useState<Theme>("light");
  //const progress = useSharedValue<number>(0);
  const progress = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const toggleSwitch = () =>
    setTheme((previousState) => (previousState === "dark" ? "light" : "dark"));

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor: backgroundColor,
    };
  }, []);

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return {
      backgroundColor: backgroundColor,
    };
  }, []);

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color: color,
    };
  }, []);

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <StatusBar />
      <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleSwitch}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={"violet"}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0.5 * SIZE,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 70,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 12,
    marginBottom: 35,
  },
});

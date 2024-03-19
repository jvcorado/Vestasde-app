import React, { useState, useEffect } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

const SkeletonMenu: React.FC = () => {
  const [colorAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(colorAnimation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const backgroundColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#CCCCCC", "#EEEEEE"],
  });

  return (
    <View style={styles.menuContainer}>
      <Animated.View style={[styles.menuItem, { backgroundColor }]} />
      <Animated.View style={[styles.menuItem, { backgroundColor }]} />
      <Animated.View style={[styles.menuItem, { backgroundColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30,
  },
  menuItem: {
    width: "30%", // Ajuste conforme necessário
    height: 40, // Ajuste conforme necessário
    backgroundColor: "#c0bebe",
    borderRadius: 10,
  },
});

export default SkeletonMenu;

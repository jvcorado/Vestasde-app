import React, { useState, useEffect } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";

const SkeletonItem: React.FC = () => {
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
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
      }}
    >
      <Animated.View style={[styles.skeletonItem, { backgroundColor }]}>
        <View style={styles.skeletonTitle}></View>
        <View style={styles.skeletonSubtitle}></View>
        <View style={styles.skeletonTitle}></View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonItem: {
    width: "90%",
    margin: "auto",
    backgroundColor: "#c0bebe",
    padding: 20,
    gap: 10,
    borderRadius: 20,
  },
  skeletonTitle: {
    width: "80%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  skeletonSubtitle: {
    width: "90%",
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});

export default SkeletonItem;

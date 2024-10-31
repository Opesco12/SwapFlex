import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

const Line = () => {
  return <View style={styles.horizontalLine}></View>;
};

export default Line;

const styles = StyleSheet.create({
  horizontalLine: {
    alignSelf: "center",
    backgroundColor: Colors.light,
    height: 1,
    margin: 8,
    opacity: 0.5,
    width: "100%",
  },
});

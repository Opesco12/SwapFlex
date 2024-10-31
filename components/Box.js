import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";

const Box = ({ children, style }) => {
  return <View style={[styles.box, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.lightBG,
    borderRadius: 15,
    gap: 8,
    marginTop: 15,
    marginBottom: 15,
    padding: 15,
    width: "100%",
  },
});

export default Box;

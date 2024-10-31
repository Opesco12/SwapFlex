import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import Colors from "@/constants/Colors";
import AppButtonIcon from "./AppButtonIcon";

const AppButton = ({
  onPress,
  icon,
  color = Colors.white,
  size,
  text,
  style,
  children,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={styles.text}>{children}</Text>
        <AppButtonIcon
          icon={icon}
          color={color}
          size={size}
        />
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    height: 55,
    justifyContent: "center",
    // padding: 12,
    marginVertical: 10,
    width: "100%",
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});

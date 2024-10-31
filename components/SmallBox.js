import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import Colors from "@/constants/Colors";
import StyledText from "./StyledText";

const SmallBox = ({ children, text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: "48%" }}
    >
      <View style={[styles.smallBox]}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 5 }}>
          {children}
        </View>
        <StyledText
          variant="medium"
          type="body"
          color={Colors.light}
        >
          {text}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  smallBox: {
    alignItems: "center",
    backgroundColor: Colors.lightBG,
    borderRadius: 10,
    gap: 25,
    height: 150,
    justifyContent: "center",
  },
});

export default SmallBox;

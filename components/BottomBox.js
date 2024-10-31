import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import Box from "./Box";
import Colors from "@/constants/Colors";
import StyledText from "./StyledText";

const BottomBox = () => {
  return (
    <Box style={{ padding: 25 }}>
      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name="bitcoin"
          size={55}
          color="#ffb200"
        />
        <MaterialCommunityIcons
          name="ethereum"
          size={55}
          color="#454976"
        />
        <MaterialCommunityIcons
          name="litecoin"
          size={55}
          color="#c0c0c0"
        />
      </View>

      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name="currency-usd"
          size={55}
          color="#008080"
        />
        <MaterialCommunityIcons
          name="cash-multiple"
          size={55}
          color="green"
        />
        <MaterialCommunityIcons
          name="shield-check"
          size={55}
          color="gold"
        />
      </View>

      <StyledText
        type="subheading"
        variant="semibold"
        color={Colors.light}
        style={{ textAlign: "center", marginBottom: 10, marginTop: 25 }}
      >
        We trade all kinds of assets
      </StyledText>
      <View style={styles.textWrapper}>
        <StyledText
          type="body"
          variant="medium"
          color={Colors.light}
        >
          Fast and Reliable
        </StyledText>
        <MaterialIcons
          name="verified"
          size={20}
          color="silver"
        />
      </View>
    </Box>
  );
};

export default BottomBox;

const styles = StyleSheet.create({
  boxText: {
    color: Colors.light,
    fontSize: 15,
    fontWeight: "600",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.silver,
    textAlign: "center",
  },
  textWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
    justifyContent: "center",
  },
});

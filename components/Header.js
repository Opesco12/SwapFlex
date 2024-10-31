import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "@/constants/Colors";
import { router } from "expo-router";
import StyledText from "./StyledText";
import { User } from "iconsax-react-native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <StyledText
        type="subheading"
        variant="semibold"
        color={Colors.light}
      >
        Hello,
      </StyledText>
      <User
        variant="Bold"
        size={25}
        color={Colors.light}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
});

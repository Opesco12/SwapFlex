import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Logo = () => {
  return (
    <View style={styles.logoSection}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.logoText}>SwapFlex</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 50,
    width: 50,
  },
  logoText: {
    color: colors.secondary,
    fontSize: 20,
    marginTop: 5,
    marginBottom: 20,
  },
});

export default Logo;

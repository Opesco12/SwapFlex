import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AppButtonIcon = ({ icon, color, size = 20 }) => {
  return <MaterialCommunityIcons name={icon} color={color} size={size} />;
};

export default AppButtonIcon;

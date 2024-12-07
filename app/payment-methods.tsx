import React, { useState } from "react";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Apple, Bank, Paypal, Thorchain } from "iconsax-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

import AppBackHeader from "@/components/AppBackHeader";
import Screen from "@/components/Screen";
import Colors from "@/constants/Colors";
import Box from "@/components/Box";

import { useNetwork } from "@/context/NetworkContext";

const PaymentMethods = () => {
  const { isConnected } = useNetwork();

  const navigate = (location, currency) => {
    if (isConnected !== null) {
      if (currency) {
        router.push({
          pathname: `/${location}`,
          params: { currency: currency },
        });
      } else {
        router.push(`/${location}`);
      }
    } else {
      showMessage({
        message: "You are not connected to the internet",
        type: "warning",
      });
    }
  };
  return (
    <Screen>
      <AppBackHeader />
      <View style={styles.header}>
        <Text style={[styles.text, styles.headerText]}>Payment Methods</Text>
      </View>

      <Box style={{ marginTop: 35 }}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigate("bank-details", "USD")}
        >
          <View style={styles.row}>
            <Bank
              size={25}
              color={Colors.light}
            />
            <Text style={styles.text}>Bank Transfer</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            color={Colors.light}
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigate("apple-pay")}
        >
          <View style={styles.row}>
            <Apple
              size={25}
              color={Colors.light}
            />
            <Text style={styles.text}>Apple Pay</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            color={Colors.light}
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigate("paypal")}
        >
          <View style={styles.row}>
            <Paypal
              size={25}
              color={Colors.light}
            />
            <Text style={styles.text}>PayPal</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            color={Colors.light}
            size={25}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigate("zelle")}
        >
          <View style={styles.row}>
            <Thorchain
              size={25}
              color={Colors.light}
            />
            <Text style={styles.text}>Zelle</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            color={Colors.light}
            size={25}
          />
        </TouchableOpacity>
      </Box>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    color: Colors.light,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    alignItems: "center",
  },
  text: {
    color: Colors.light,
    fontSize: 18,
  },
  dropdown: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    color: Colors.light,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default PaymentMethods;

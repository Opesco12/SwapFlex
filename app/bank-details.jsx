import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import getSymbolFromCurrency from "currency-symbol-map";
import { getDatabase, ref, onValue, set } from "firebase/database";

import Colors from "@/constants/Colors";
import Box from "../components/Box";
import AppButton from "../components/AppButton";

import Screen from "@/components/Screen";

import { db } from "@/firebaseConfig";

const BankDetailsScreen = ({ route }) => {
  const { currency } = useLocalSearchParams();
  // const currency = route.params.currency;
  // const rate = route.params.rate;
  // const max = route.params.account.max_amount_receivable;
  // const account = route.params.account;

  const max = 2000; //2 thousand dollars or Euros

  const [amount, setAmount] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState([]);
  const navigation = useNavigation();

  const handleInput = (input) => {
    const maxValue = max;

    if (input <= maxValue) {
      setAmount(input);
    }
  };

  useEffect(() => {
    console.log("Got here");
    const ratesRef = ref(db, "exchangeRates");
    console.log("Reference created:", ratesRef);
    console.log("Here too");
    const unsubscribe = onValue(ratesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data gotten: ", data);
      const formattedRates = Object.entries(data).map(([key, value]) => ({
        currency: key,
        rate: value,
      }));
      console.log("Here also");
      console.log("Rates: ", formattedRates);
      setRates(formattedRates);
      setLoading(false);
    });

    // Return unsubscribe to clean up on unmount
    return () => unsubscribe();
  }, []);

  const rateForCurrency = rates?.find(
    (item) => item.currency === currency
  )?.rate;

  if (loading)
    return (
      <Screen>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            color={Colors.light}
          />
        </TouchableWithoutFeedback>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      </Screen>
    );

  return (
    <Screen>
      <View>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            color={Colors.light}
          />
        </TouchableWithoutFeedback>

        <View style={styles.header}>
          <Text
            style={[
              styles.text,
              {
                fontSize: 20,
                fontWeight: "600",
                textAlign: "center",
                color: Colors.light,
              },
            ]}
          >
            Bank Transfer
          </Text>
        </View>

        <Box style={styles.box}>
          <Text
            style={[styles.text, { textAlign: "center", marginBottom: 10 }]}
          >
            {currency} to NGN
          </Text>

          <View style={styles.inputBox}>
            <Text style={styles.currencySign}>
              {getSymbolFromCurrency(currency)}
            </Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(input) => handleInput(input)}
              placeholder="Amount"
              placeholderTextColor={Colors.light}
              value={amount}
              style={styles.input}
            />
            <Text
              style={{ color: Colors.light, right: 0, position: "absolute" }}
            >
              max:{" "}
              {rates &&
                max.toLocaleString("en-US", {
                  style: "currency",
                  currency: currency,
                })}{" "}
            </Text>
          </View>

          <Text style={styles.text}>
            Rate:{" "}
            {rates &&
              rateForCurrency?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
          </Text>

          <Text style={styles.text}>
            Amount to be received:{" "}
            {rates &&
              (amount * rateForCurrency).toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
          </Text>

          {/* <View style={{ display: isHidden || isLoading ? "none" : "flex" }}>
            {account && (
              <>
                {currency === "USD" ? (
                  <>
                    <Line />
                    <Text style={styles.text}>
                      Account Holder: {account.account_holder}
                    </Text>
                    <Text style={styles.text}>
                      Account Number: {account.account_number}
                    </Text>
                    <Text style={styles.text}>
                      Routing NUmber: {account.routing_number}
                    </Text>
                    <Text style={styles.text}>
                      Bank Name: {account.bank_name}
                    </Text>
                    <Text style={styles.text}>
                      Account Type: {account.account_type}
                    </Text>
                  </>
                ) : (
                  <>
                    <Line />
                    <Text style={styles.text}>
                      Account Holder: {account.account_holder}
                    </Text>
                    <Text style={styles.text}>Iban: {account.iban}</Text>
                    <Text style={styles.text}>
                      Bic Code: {account.swift_code}
                    </Text>
                    <Text style={styles.text}>
                      Sort Code: {account.sort_code}
                    </Text>
                  </>
                )}
              </>
            )}
          </View> */}
          <AppButton
            style={{
              display: isHidden || isLoading ? "flex" : "none",
              marginTop: 35,
            }}
            onPress={() => {
              setIsLoading(true);

              setTimeout(() => {
                setIsLoading(false);
                setIsHidden(false);
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
              }, 2000);
            }}
          >
            {isLoading ? (
              <ActivityIndicator
                size={"large"}
                color={Colors.white}
              />
            ) : (
              "Generate Bank Details"
            )}
          </AppButton>
        </Box>

        <Text style={[styles.text, { fontSize: 16, marginTop: 10 }]}>
          Note: You are required to use the generated bank details within an
          hour and proceed to send proof of payment by tapping "Chat With Us" at
          the bottom of this page
        </Text>
      </View>

      <View style={styles.support}>
        <MaterialCommunityIcons
          name="headphones"
          color={Colors.secondary}
          size={20}
        />
        <Text
          style={[styles.text, { color: Colors.secondary }]}
          onPress={() => {}}
        >
          Chat With Us
        </Text>
      </View>
    </Screen>
  );
};

export default BankDetailsScreen;

const styles = StyleSheet.create({
  box: {
    marginTop: 25,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  currencySign: {
    fontSize: 20,
    color: Colors.light,
  },
  header: {
    alignSelf: "center",
  },
  input: {
    color: Colors.silver,
    fontSize: 18,
  },
  inputBox: {
    alignItems: "center",
    borderColor: Colors.silver,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
    height: 45,
    padding: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  support: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
  },
  text: {
    color: Colors.silver,
    fontSize: 18,
    fontWeight: "500",
  },
});

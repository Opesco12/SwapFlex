import {
  ActivityIndicator,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import getSymbolFromCurrency from "currency-symbol-map";
import { ref, onValue } from "firebase/database";
import { useLocalSearchParams } from "expo-router";

import Colors from "@/constants/Colors";
import Box from "../components/Box";
import AppButton from "../components/AppButton";
import AppBackHeader from "@/components/AppBackHeader";
import Screen from "@/components/Screen";
import { db } from "@/firebaseConfig";

const { width } = Dimensions.get("window");

const BankDetailsScreen = ({ route }) => {
  const { currency } = useLocalSearchParams();
  const max = 2000;

  const [amount, setAmount] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState([]);
  const [accountDetails, setAccountDetails] = useState({});

  const handleInput = (input) => {
    const maxValue = max;
    if (input <= maxValue) {
      setAmount(input);
    }
  };

  useEffect(() => {
    const ratesRef = ref(db, "exchangeRates");
    const accountRef = ref(db, `currencyExchangeAccount/${currency}`);

    const getRates = onValue(ratesRef, (snapshot) => {
      const data = snapshot.val();
      const formattedRates = Object.entries(data).map(([key, value]) => ({
        currency: key,
        rate: value,
      }));

      setRates(formattedRates);
    });

    const getAccount = onValue(accountRef, (snapshot) => {
      const data = snapshot.val();
      setAccountDetails(data);
    });
    setLoading(false);

    return () => {
      getRates();
      getAccount();
    };
  }, []);

  const rateForCurrency = rates?.find(
    (item) => item.currency === currency
  )?.rate;

  if (loading)
    return (
      <Screen>
        <AppBackHeader />
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.secondary}
          />
        </View>
      </Screen>
    );

  return (
    <Screen>
      <AppBackHeader />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Bank Transfer</Text>
      </View>

      <Box style={styles.box}>
        <Text style={styles.currencyPairText}>{currency} to NGN</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencySymbol}>
              {getSymbolFromCurrency(currency)}
            </Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(input) => handleInput(input)}
              placeholder="Enter Amount"
              placeholderTextColor={Colors.light}
              value={amount}
              style={styles.input}
            />
            <Text style={styles.maxAmountText}>
              max:{" "}
              {max.toLocaleString("en-US", {
                style: "currency",
                currency: currency,
              })}
            </Text>
          </View>
        </View>

        <View style={styles.rateContainer}>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Exchange Rate:</Text>
            <Text style={styles.rateValue}>
              {rates &&
                rateForCurrency?.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
            </Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>You'll Receive:</Text>
            <Text style={styles.rateValue}>
              {rates &&
                (amount * rateForCurrency).toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })}
            </Text>
          </View>
        </View>

        {!isHidden && !isLoading && (
          <View style={styles.accountDetailsContainer}>
            {currency === "USD" ? (
              <>
                <DetailRow
                  label="Account Holder"
                  value={accountDetails?.accountName}
                />
                <DetailRow
                  label="Account Number"
                  value={accountDetails?.accountNo}
                />
                <DetailRow
                  label="Routing Number"
                  value={accountDetails?.accountType}
                />
                <DetailRow
                  label="Bank Name"
                  value={accountDetails?.bankName}
                />
                <DetailRow
                  label="Account Type"
                  value={accountDetails?.address}
                />
              </>
            ) : (
              <>
                <DetailRow
                  label="Account Holder"
                  value={accountDetails?.account_holder}
                />
                <DetailRow
                  label="IBAN"
                  value={accountDetails?.iban}
                />
                <DetailRow
                  label="BIC Code"
                  value={accountDetails?.swift_code}
                />
                <DetailRow
                  label="Sort Code"
                  value={accountDetails?.sort_code}
                />
              </>
            )}
          </View>
        )}

        <AppButton
          style={[
            styles.generateButton,
            { display: isHidden || isLoading ? "flex" : "none" },
          ]}
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
              size="large"
              color={Colors.white}
            />
          ) : (
            "Generate Bank Details"
          )}
        </AppButton>

        <Text style={styles.noteText}>
          Note: You are required to use the generated bank details within an
          hour and proceed to send proof of payment by tapping "Chat With Us"
        </Text>
      </Box>

      <TouchableOpacity style={styles.supportContainer}>
        <Ionicons
          name="chatbubble-ellipses"
          color={Colors.white}
          size={24}
        />
        <Text style={styles.supportText}>Chat With Us</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text
      numberOfLines={1}
      style={styles.detailValue}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.white,
  },
  box: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    padding: 20,
  },
  currencyPairText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 18,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  currencySymbol: {
    color: Colors.white,
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontSize: 18,
  },
  maxAmountText: {
    color: Colors.white,
    opacity: 0.7,
  },
  rateContainer: {
    marginBottom: 15,
  },
  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rateLabel: {
    color: Colors.white,
    fontSize: 16,
  },
  rateValue: {
    color: Colors.white,
    fontWeight: "bold",
  },
  accountDetailsContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    color: Colors.white,
    opacity: 0.7,
  },
  detailValue: {
    color: Colors.white,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  generateButton: {
    marginBottom: 15,
  },
  noteText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
  },
  supportContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  supportText: {
    color: Colors.white,
    marginLeft: 10,
    fontSize: 18,
  },
});

export default BankDetailsScreen;

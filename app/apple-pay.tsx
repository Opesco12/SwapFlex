import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import AppBackHeader from "@/components/AppBackHeader";
import Screen from "@/components/Screen";
import Box from "../components/Box";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebaseConfig";

const ApplePayScreen = () => {
  const [loading, setLoading] = useState(true);
  const [applePayDetails, setApplePayNumber] = useState({});

  useEffect(() => {
    const detailsRef = ref(db, "payments/apple-pay");
    const unsubscribe = onValue(detailsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      setApplePayNumber(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <Screen>
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
        <Text style={styles.headerTitle}>Apple Pay Transfer</Text>
      </View>

      <Box style={styles.box}>
        <View style={styles.infoContainer}>
          <Text style={styles.instructionText}>
            Transfer money using Apple Pay to the apple pay number below:
          </Text>
          <Text style={styles.email}>{applePayDetails?.number}</Text>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Ensure the transfer is complete and proceed to send proof of payment
            by tapping "Chat With Us" below.
          </Text>
        </View>
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

const styles = StyleSheet.create({
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
  infoContainer: {
    marginBottom: 20,
  },
  instructionText: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 16,
    marginBottom: 10,
  },
  email: {
    textAlign: "center",
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  noteContainer: {
    marginTop: 15,
  },
  noteText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
  },
  generateButton: {
    marginBottom: 15,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ApplePayScreen;

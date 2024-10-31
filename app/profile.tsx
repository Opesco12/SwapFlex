import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { auth } from "../firebaseConfig";
import { signOut, sendEmailVerification } from "firebase/auth";
import { showMessage } from "react-native-flash-message";

import Colors from "@/constants/Colors";
import AppFormField from "../components/AppFormField";
import AppButton from "../components/AppButton";
import Line from "../components/Line";
import { router } from "expo-router";

const ProfilePageScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const user = auth?.currentUser;
  const emailIsVerified = auth?.currentUser?.emailVerified;

  const sendVerificationMail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() =>
        showMessage({
          message: "Email verification mail sent",
          type: "success",
        })
      )
      .catch((error) => {
        if (error.code === "auth/network-request-failed") {
          showMessage({
            message: "check your internet connection",
            type: "warning",
          });
        }
      });
  };

  useEffect(() => {
    if (auth?.currentUser) {
      setEmail(auth.currentUser.email);
      setName(auth.currentUser.displayName);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="chevron-left"
          color={Colors.light}
          size={40}
        />
      </TouchableWithoutFeedback>

      <Text style={styles.header}>Profile</Text>
      <FontAwesome
        name="user-circle"
        color={Colors.light}
        size={80}
        style={styles.image}
      />

      <Text
        style={[
          styles.menuText,
          { textAlign: "center", marginTop: 5, opacity: 1 },
        ]}
      >
        {name}
      </Text>
      <View>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
            gap: 3,
          }}
        >
          <Text
            style={[
              styles.menuText,
              {
                fontSize: 14,
                textAlign: "center",
                marginTop: 5,
              },
            ]}
          >
            {email}
          </Text>
          <MaterialIcons
            name="verified"
            size={14}
            color={Colors.light}
            style={{
              display: emailIsVerified ? "flex" : "none",
            }}
          />
        </View>
        <TouchableOpacity
          onPress={sendVerificationMail}
          style={[
            styles.verifyButton,
            { display: emailIsVerified ? "none" : "flex" },
          ]}
        >
          <Text style={styles.verifyButtonText}>verify</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        <View style={styles.menuItem}>
          <TouchableOpacity>
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>
        </View>
        <Line />
        <View style={styles.menuItem}>
          <TouchableOpacity
            onPress={() => {
              signOut(auth)
                .then(() => router.replace("/login"))
                .catch((error) => {
                  showMessage({
                    message: error.message,
                    type: "warning",
                  });
                });
            }}
          >
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfilePageScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  form: {
    marginTop: 20,
  },
  header: {
    color: Colors.light,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
  },
  image: {
    alignSelf: "center",
  },
  menu: {
    marginTop: 40,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    color: Colors.light,
    opacity: 0.8,
  },
  verifyButton: {
    alignItems: "center",
    alignSelf: "center",
    borderColor: Colors.light,
    borderRadius: 7,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 3,
    opacity: 0.7,
    padding: 3,
    width: 50,
  },
  verifyButtonText: {
    color: Colors.light,
  },
});

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

import AppFormField from "../components/AppFormField";
import AppButton from "../components/AppButton";
import Colors from "@/constants/Colors";
import Screen from "@/components/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required("Password is required").label("Password"),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;

  React.useLayoutEffect(() => {
    // Disable the back button in the header
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  const SignIn = (email, password, { setFieldError }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        showMessage({
          message: "Sign in Successful",
          type: "success",
        });

        router.replace("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          showMessage({
            message: "Invalid Email or Password",
            type: "danger",
          });
        } else if (error.code === "auth/network-request-failed") {
          showMessage({
            message: "Check your internet connection",
            type: "warning",
          });
        }
      });
  };

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);
  return (
    <Screen>
      <View
        style={{
          marginBottom: 40,
        }}
      >
        <Text style={styles.header}>Welcome Back!</Text>
        <Text style={{ color: Colors.light, opacity: 0.6, fontSize: 14 }}>
          Log in to your account
        </Text>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, helpers) => {
          helpers.setSubmitting(true);
          SignIn(values.email, values.password, helpers);
          helpers.setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <>
            <AppFormField
              name="email"
              placeholder={"Email"}
              keyboardType="email-address"
            />

            <AppFormField
              name="password"
              placeholder={"Password"}
              secureTextEntry
            />
            <Text
              style={[
                styles.link,
                {
                  marginTop: -5,
                  textAlign: "right",
                  opacity: 0.7,
                  textDecorationLine: "underline",
                },
              ]}
              // onPress={() => router.push("password")}
            >
              Forgot password?
            </Text>

            <AppButton
              onPress={handleSubmit}
              style={{ marginTop: 40 }}
            >
              {isSubmitting === true ? (
                <ActivityIndicator size={"small"} />
              ) : (
                "Login"
              )}
            </AppButton>
          </>
        )}
      </Formik>

      <Text style={styles.text}>
        Don't have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.replace("/register")}
        >
          Sign Up
        </Text>
      </Text>
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    color: Colors.silver,
    fontSize: 25,
    fontWeight: 800,
    marginTop: 40,
  },
  link: {
    color: Colors.secondary,
  },
  text: {
    color: Colors.light,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
});

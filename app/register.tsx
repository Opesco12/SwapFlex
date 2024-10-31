import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import AppButton from "../components/AppButton";
import AppFormField from "../components/AppFormField";
import Screen from "@/components/Screen";

const validationSchema = Yup.object().shape({
  fname: Yup.string().required().max(30).label("First Name"),
  lname: Yup.string().required().max(30).label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(6)
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Password")
    .required("Password is required"),
});

const RegisterScreen = () => {
  const navigation = useNavigation();

  const createUser = (email, password, fname, lname, { setFieldError }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        showMessage({
          message: "Succesfully created an account",
          type: "success",
        });
        navigation.replace("Home");
      })
      .then(() => {
        const user = auth.currentUser;
        updateProfile(user, { displayName: fname + lname });
      })
      .catch((error) => {
        const errorCode = error.errorCode;
        const errorMessage = error.message;

        if (error.code === "auth/invalid-email") {
          setFieldError("email", "Invalid Email");
        } else if (error.code === "auth/email-already-in-use") {
          setFieldError("email", "Email already in use...");
        } else if (error.code === "auth/weak-password") {
          setFieldError("password", "Weak password");
        } else if (error.code === "auth/network-request-failed") {
          showMessage({
            message: "Check your internet connection",
            type: "warning",
          });
        }
      });
  };
  return (
    <Screen>
      <View style={{ marginBottom: 40 }}>
        <Text style={styles.header}>Hello, It's nice to meet you</Text>
        <Text style={{ color: Colors.light, opacity: 0.6, fontSize: 14 }}>
          Create an account below
        </Text>
      </View>
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, helpers) => {
          helpers.setSubmitting(true);
          createUser(
            values.email,
            values.password,
            values.fname,
            values.lname,
            helpers
          );

          helpers.setSubmitting(false);
        }}
      >
        {({ handleSubmit, values, isSubmitting }) => (
          <>
            <AppFormField
              name={"fname"}
              placeholder={"First Name"}
            />

            <AppFormField
              name={"lname"}
              placeholder={"Last Name"}
            />

            <AppFormField
              name={"email"}
              placeholder={"Email"}
              keyboardType="email-address"
            />
            <AppFormField
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <AppFormField
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
            />

            <AppButton
              onPress={handleSubmit}
              text={
                isSubmitting ? <ActivityIndicator size={"small"} /> : "Sign Up"
              }
              style={{ marginTop: 35 }}
            />
          </>
        )}
      </Formik>

      <Text style={styles.text}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => router.replace("/login")}
        >
          Sign In
        </Text>
      </Text>
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 14,
    marginVertical: 2,
    opacity: 0.6,
  },
  link: {
    color: Colors.secondary,
  },
  header: {
    color: Colors.silver,
    fontSize: 25,
    fontWeight: 800,
    marginTop: 40,
  },
  textInput: {
    backgroundColor: Colors.lightBG,
    borderRadius: 10,
    color: Colors.white,
    fontSize: 16,
    height: 45,
    padding: 5,
    width: "100%",
  },
  text: {
    color: Colors.light,
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
});

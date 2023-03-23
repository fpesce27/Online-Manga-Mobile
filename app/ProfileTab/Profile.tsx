import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import LoginScreen from "react-native-login-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../db/firebase";
import Login from "../../components/Login";
import { useNavigation, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Tabs } from "../../App";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import BannerAdComponent from "../../components/BannerAdComponent";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-8675591191850393/1962449168";

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

type props = BottomTabNavigationProp<Tabs, "Home">;

const Profile = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  const signOut = () => {
    interstitial.show().then(() => {
      auth.signOut();
      navigation.navigate<props>("Profile");
    });
  };

  auth.onAuthStateChanged((user) => {
    if (!user) {
      navigation.navigate<props>("Profile");
    }
  });

  // No advert ready to show yet
  if (!loaded) {
    return (
      <>
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ ...styles.text, color: theme.colors.text }}>
            Sesion Iniciada como:
          </Text>
          <Text
            style={{ ...styles.text, fontSize: 40, color: theme.colors.text }}
          >
            {auth.currentUser?.displayName}
          </Text>
          <TouchableOpacity onPress={signOut} style={styles.button}>
            <Text style={{ ...styles.signOutText, color: theme.colors.text }}>
              Cerrar Sesion
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        <BannerAdComponent />
      </>
    );
  }

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ ...styles.text, color: theme.colors.text }}>
          Sesion Iniciada como:
        </Text>
        <Text
          style={{ ...styles.text, fontSize: 40, color: theme.colors.text }}
        >
          {auth.currentUser?.displayName}
        </Text>
        <TouchableOpacity onPress={signOut} style={styles.button}>
          <Text style={{ ...styles.signOutText, color: theme.colors.text }}>
            Cerrar Sesion
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <BannerAdComponent />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  signOutText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

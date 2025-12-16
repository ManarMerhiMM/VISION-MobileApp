// Connection screen: centered layout + status-driven actions
import React, { useContext, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import PrimaryButton from "../components/PrimaryButton";
import { RootStackParamList } from "../navigation/AppNavigator";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Connection">;

export default function ConnectionScreen(props: Props): React.JSX.Element {
  var auth = useContext(AuthContext);
  var [isConnected, setIsConnected] = useState<boolean>(false);

  var usernameText = useMemo(function () {
    var anyUser: any = auth.user;
    return anyUser?.username ?? anyUser?.name ?? anyUser?.email ?? "User";
  }, [auth.user]);

  function onConnect(): void {
    setIsConnected(true);
    Alert.alert("Connected", "BLE connection will be implemented later.");
  }

  function onDisconnect(): void {
    setIsConnected(false);
    Alert.alert("Disconnected", "BLE disconnection will be implemented later.");
  }

  function goDashboard(): void {
    props.navigation.navigate("Dashboard");
  }

  async function onLogout(): Promise<void> {
    await auth.signOut();
  }

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.center}>
        <Text style={styles.brand}>VISION</Text>
        <Text style={styles.subtitle}>Device Connection</Text>

        <Text style={styles.user}>
          Logged in as: <Text style={styles.userName}>{usernameText}</Text>
        </Text>

        <View style={styles.card}>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.dot,
                { backgroundColor: isConnected ? "#22C55E" : "#EF4444" },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: isConnected ? "#22C55E" : "#EF4444" },
              ]}
            >
              {isConnected ? "Connected" : "Disconnected"}
            </Text>
          </View>

          <View style={styles.buttons}>
            {!isConnected ? (
              <PrimaryButton title="Connect" onPress={onConnect} />
            ) : (
              <>
                <PrimaryButton title="Disconnect" onPress={onDisconnect} />
                <PrimaryButton title="Dashboard" onPress={goDashboard} />
              </>
            )}
          </View>

          <Pressable onPress={onLogout} style={styles.logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.bgTop,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  brand: {
    fontSize: 42,
    fontWeight: "900",
    color: Colors.accentBlue, // 🔵 same as login
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: Colors.textMuted,
  },

  user: {
    marginTop: 12,
    fontSize: 13,
    color: Colors.textMuted,
  },
  userName: {
    color: Colors.text,
    fontWeight: "800",
  },

  card: {
    width: "100%",
    marginTop: 22,
    backgroundColor: "#0E1628",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(79,141,247,0.18)",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "900",
  },

  buttons: {
    gap: 12,
  },

  logout: {
    marginTop: 14,
    alignItems: "center",
  },
  logoutText: {
    color: Colors.textMuted,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
});
// Login screen: VISION dark theme + website link + show/hide password + forgot password modal
import React, { useContext, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Linking,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import PrimaryButton from "../components/PrimaryButton";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../theme/colors";
import { FRONTEND_URL } from "../config/env";
import { api } from "../services/api"; // axios instance that already uses API_URL

export default function LoginScreen(): React.JSX.Element {
  var auth = useContext(AuthContext);

  var [username, setUsername] = useState<string>("");
  var [password, setPassword] = useState<string>("");
  var [loading, setLoading] = useState<boolean>(false);
  var [showPassword, setShowPassword] = useState<boolean>(false);

  // Forgot password modal state
  var [fpOpen, setFpOpen] = useState<boolean>(false);
  var [fpEmail, setFpEmail] = useState<string>("");
  var [fpLoading, setFpLoading] = useState<boolean>(false);

  async function onLogin(): Promise<void> {
    if (!username.trim() || !password) {
      Alert.alert("Missing data", "Please enter username and password.");
      return;
    }

    try {
      setLoading(true);
      await auth.signIn(username.trim(), password);
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        var apiMsg: string | undefined = e.response?.data?.message;

        Alert.alert("Error", apiMsg ?? "An unexpected error occurred :/");
        return;
      }

      Alert.alert("Error", "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function openWebsite(): Promise<void> {
    try {
      await Linking.openURL(FRONTEND_URL);
    } catch {
      Alert.alert("Cannot open link", FRONTEND_URL);
    }
  }

  function openForgotPassword(): void {
    setFpEmail("");
    setFpOpen(true);
  }

  function closeForgotPassword(): void {
    if (fpLoading) return;
    setFpOpen(false);
  }

  async function sendResetLink(): Promise<void> {
    if (!fpEmail.trim()) {
      Alert.alert("Missing data", "Please enter your email.");
      return;
    }

    try {
      setFpLoading(true);

      // API demo: POST /api/forgot-password
      // Because api baseURL already ends with /api, we call "/forgot-password"
      await api.post("/forgot-password", { email: fpEmail.trim() });

      Alert.alert("Email sent", "If the email exists, a reset link has been sent.");
      setFpOpen(false);
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        var msg: string | undefined = e.response?.data?.message;
        Alert.alert("Error", msg ?? "Failed to send reset link. Please try again.");
        return;
      }
      Alert.alert("Error", "Failed to send reset link. Please try again.");
    } finally {
      setFpLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.brand}>VISION</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.note}>*Use your VISION account credentials</Text>

        <View style={styles.form}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={Colors.textMuted}
            autoCapitalize="none"
            style={styles.input}
          />

          {/* Password + Show/Hide */}
          <View style={styles.passwordRow}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
            />

            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <Text style={styles.eyeText}>{showPassword ? "Hide" : "Show"}</Text>
            </Pressable>
          </View>

          {/* Forgot password */}
          <Pressable onPress={openForgotPassword} style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          <PrimaryButton title={loading ? "Signing in..." : "Login"} onPress={onLogin} disabled={loading} />

          <Text style={styles.footer}>
            No account? Purchase a VISION kit from{" "}
            <Text style={styles.link} onPress={openWebsite}>
              our website
            </Text>{" "}
            to get your account.
          </Text>
        </View>
      </View>

      {/* Forgot Password Modal */}
      <Modal visible={fpOpen} transparent={true} animationType="fade" onRequestClose={closeForgotPassword}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Reset password</Text>
            <Text style={styles.modalHint}>Enter your email and we’ll send a reset link.</Text>

            <TextInput
              value={fpEmail}
              onChangeText={setFpEmail}
              placeholder="Email"
              placeholderTextColor={Colors.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.modalInput}
              editable={!fpLoading}
            />

            <View style={styles.modalActions}>
              <Pressable onPress={closeForgotPassword} style={[styles.modalBtn, styles.modalBtnGhost]} disabled={fpLoading}>
                <Text style={[styles.modalBtnText, styles.modalBtnGhostText]}>Cancel</Text>
              </Pressable>

              <Pressable onPress={sendResetLink} style={[styles.modalBtn, styles.modalBtnPrimary]} disabled={fpLoading}>
                {fpLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.modalBtnText}>Send link</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

var styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: Colors.bgTop,
    padding: 20,
    justifyContent: "center",
  },

  brand: {
    fontSize: 44,
    fontWeight: "900",
    color: Colors.accentBlue,
    textAlign: "center",
    marginBottom: 18,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "#0E1628",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(79,141,247,0.18)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },

  title: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },

  note: {
    color: Colors.warning,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 6,
  },

  form: {
    gap: 12,
    marginTop: 16,
  },

  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: Colors.text,
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },

  passwordRow: {
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 14,
    color: Colors.text,
  },

  eyeBtn: {
    paddingHorizontal: 14,
    height: "100%",
    justifyContent: "center",
    borderLeftWidth: 1,
    borderLeftColor: Colors.cardBorder,
  },

  eyeText: {
    color: Colors.accentBlue,
    fontWeight: "800",
    fontSize: 12,
  },

  forgotBtn: {
    alignSelf: "flex-end",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },

  forgotText: {
    color: Colors.warning,
    fontWeight: "800",
    fontSize: 12,
    textDecorationLine: "underline",
  },

  footer: {
    marginTop: 10,
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },

  link: {
    color: Colors.link,
    fontWeight: "800",
    textDecorationLine: "underline",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#0E1628",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.25)",
  },

  modalTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },

  modalHint: {
    color: Colors.textMuted,
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 16,
  },

  modalInput: {
    marginTop: 14,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: Colors.text,
    backgroundColor: Colors.inputBg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },

  modalActions: {
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
  },

  modalBtn: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  modalBtnGhost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.35)",
  },

  modalBtnPrimary: {
    backgroundColor: Colors.accentBlue,
  },

  modalBtnText: {
    color: "white",
    fontWeight: "900",
    fontSize: 13,
  },

  modalBtnGhostText: {
    color: Colors.warning,
  },
});
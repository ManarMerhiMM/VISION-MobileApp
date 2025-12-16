// Dashboard: metrics cards + latest alert (no connection status, no automation notes).
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/AppNavigator";
import { AuthContext } from "../context/AuthContext";
import { Colors } from "../theme/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Dashboard">;

export default function DashboardScreen(props: Props): React.JSX.Element {
    var auth = useContext(AuthContext);

    var anyUser: any = auth.user;
    var usernameText: string = anyUser?.username ?? anyUser?.name ?? anyUser?.email ?? "User";

    // Placeholder values until BLE is integrated
    var metrics = [
        { key: "battery", label: "System Battery (%)", value: "--" },
        { key: "bpm", label: "Heart Rate (BPM)", value: "--" },
        { key: "spo2", label: "SpO₂ (%)", value: "--" },
        { key: "gsr", label: "GSR (µS)", value: "--" },
        { key: "rh", label: "Relative Humidity (%)", value: "--" },
    ];

    var alertBody = "No alerts";

    function goConnection(): void {
        props.navigation.navigate("Connection");
    }

    return (
        <SafeAreaView style={styles.page}>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.brand}>VISION</Text>

                    <Text style={styles.user}>
                        Logged in as <Text style={styles.userName}>{usernameText}</Text>
                    </Text>

                    <Pressable onPress={goConnection} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>← Back to Connection</Text>
                    </Pressable>
                </View>

                {/* Live Metrics */}
                <View style={styles.section}>
                    {metrics.map(function (m) {
                        return (
                            <View key={m.key} style={styles.metricCard}>
                                <Text style={styles.metricLabel}>{m.label}</Text>
                                <Text style={styles.metricValue}>{m.value}</Text>
                            </View>
                        );
                    })}
                </View>

                {/* Latest Alert */}
                <View style={styles.alertCard}>
                    <Text style={styles.alertTitle}>Latest Alert</Text>
                    <Text style={styles.alertBody}>{alertBody}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

var styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: Colors.bgTop,
    },
    container: {
        padding: 20,
        paddingBottom: 28,
    },

    header: {
        alignItems: "center",
        marginBottom: 14,
    },
    brand: {
        fontSize: 40,
        fontWeight: "900",
        color: Colors.accentBlue,
        letterSpacing: 1,
    },
    user: {
        marginTop: 8,
        fontSize: 13,
        color: Colors.textMuted,
        textAlign: "center",
    },
    userName: {
        color: Colors.text,
        fontWeight: "900",
    },

    backBtn: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(250, 204, 21, 0.35)",   // gold
        backgroundColor: "rgba(79, 141, 247, 0.08)", // blue tint
    },
    backBtnText: {
        color: Colors.accentBlue,
        fontWeight: "900",
        fontSize: 13,
    },



    section: {
        gap: 12,
        marginTop: 10,
    },

    // Better metric background: deep navy with slight blue/purple tint
    metricCard: {
        borderRadius: 16,
        padding: 16,
        backgroundColor: "#0C1324",
        borderWidth: 1,
        borderColor: "rgba(250, 204, 21, 0.22)", // subtle gold
    },
    metricLabel: {
        color: "#A5B4FC",
        fontSize: 13,
        fontWeight: "800",
        marginBottom: 8,
    },
    metricValue: {
        color: Colors.text,
        fontSize: 28,
        fontWeight: "900",
    },

    alertCard: {
        marginTop: 16,
        borderRadius: 16,
        padding: 16,
        backgroundColor: "#0C1324",
        borderWidth: 1,
        borderColor: "rgba(250, 204, 21, 0.55)", // stronger gold
    },
    alertTitle: {
        color: Colors.warning,
        fontSize: 14,
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 10,
    },
    alertBody: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "800",
        textAlign: "center",
        lineHeight: 20,
    },
});
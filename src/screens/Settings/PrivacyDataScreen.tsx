import React, { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScreenLayout } from "../../components/ScreenLayout";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useHealthState } from "../../state/HealthState";
import { useOrdersState } from "../../state/OrdersState";
import { buildExportPayload, stringifyExport } from "../../utils/exportData";
import { resetAllLocalData } from "../../utils/resetAppData";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";

type ShareModule = {
  isAvailableAsync: () => Promise<boolean>;
  shareAsync: (uri: string, options?: { mimeType?: string }) => Promise<void>;
};

type FileSystemModule = {
  cacheDirectory?: string;
  writeAsStringAsync: (
    path: string,
    data: string,
    options?: { encoding?: string }
  ) => Promise<void>;
};

type ClipboardModule = {
  setStringAsync?: (text: string) => Promise<void>;
  setString?: (text: string) => void;
};

const getShareModules = () => {
  let Sharing: ShareModule | undefined;
  let FileSystem: FileSystemModule | undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Sharing = require("expo-sharing");
  } catch (error) {
    Sharing = undefined;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    FileSystem = require("expo-file-system");
  } catch (error) {
    FileSystem = undefined;
  }
  return { Sharing, FileSystem };
};

const getClipboardModule = (): ClipboardModule | undefined => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require("expo-clipboard");
  } catch (error) {
    return undefined;
  }
};

export function PrivacyDataScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    mode,
    cycleEntries,
    symptomsByDate,
    pregnancy,
    reminders,
    resetHealthState,
  } = useHealthState();
  const { orders, resetOrdersState } = useOrdersState();
  const [isExportVisible, setIsExportVisible] = useState(false);
  const [exportJson, setExportJson] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const exportPayload = useMemo(
    () =>
      buildExportPayload(
        { mode, cycleEntries, symptomsByDate, pregnancy, reminders },
        { orders }
      ),
    [
      cycleEntries,
      mode,
      orders,
      pregnancy,
      reminders,
      symptomsByDate,
    ]
  );

  const handleExport = async () => {
    const json = stringifyExport(exportPayload);
    const { Sharing, FileSystem } = getShareModules();

    if (Sharing && FileSystem && FileSystem.cacheDirectory) {
      try {
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          const fileUri = `${FileSystem.cacheDirectory}biyecare-export.json`;
          await FileSystem.writeAsStringAsync(fileUri, json, {
            encoding: "utf8",
          });
          await Sharing.shareAsync(fileUri, { mimeType: "application/json" });
          return;
        }
      } catch (error) {
        // Fall back to in-app JSON modal.
      }
    }

    setExportJson(json);
    setCopyStatus(null);
    setIsExportVisible(true);
  };

  const handleCopy = async () => {
    const clipboard = getClipboardModule();
    if (clipboard?.setStringAsync) {
      await clipboard.setStringAsync(exportJson);
      setCopyStatus("Copied to clipboard.");
      return;
    }
    if (clipboard?.setString) {
      clipboard.setString(exportJson);
      setCopyStatus("Copied to clipboard.");
      return;
    }
    Alert.alert(
      "Copy unavailable",
      "Copying JSON is not available on this device yet."
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete all data?",
      "This will permanently delete all locally stored data. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await resetAllLocalData({ resetHealthState, resetOrdersState });
            Alert.alert("All data deleted", "Your local data has been cleared.");
            navigation.navigate("Main");
          },
        },
      ]
    );
  };

  return (
    <ScreenLayout title="Privacy & Data">
      <View style={styles.body}>
        <View style={styles.card}>
          <Text style={styles.bodyText}>
            Your data is stored locally on your device.
          </Text>
          <Text style={styles.bodyText}>No cloud sync is used at this stage.</Text>
          <Text style={styles.bodyText}>
            You can export or delete your data anytime.
          </Text>
        </View>
        <View style={styles.actions}>
          <PrimaryButton label="Export my data" onPress={handleExport} />
          <Pressable style={styles.destructiveButton} onPress={confirmDelete}>
            <Text style={styles.destructiveLabel}>Delete all data</Text>
          </Pressable>
        </View>
      </View>
      <Modal visible={isExportVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Exported JSON</Text>
            <ScrollView style={styles.jsonScroll}>
              <Text style={styles.jsonText}>{exportJson}</Text>
            </ScrollView>
            {copyStatus ? (
              <Text style={styles.copyStatus}>{copyStatus}</Text>
            ) : null}
            <View style={styles.modalActions}>
              <PrimaryButton label="Copy JSON" onPress={handleCopy} />
              <PrimaryButton
                label="Close"
                variant="ghost"
                onPress={() => setIsExportVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    gap: 8,
  },
  bodyText: {
    fontSize: 14,
    color: "#5A5A5A",
  },
  actions: {
    gap: 12,
  },
  destructiveButton: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E5484D",
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  destructiveLabel: {
    color: "#E5484D",
    fontWeight: "600",
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  jsonScroll: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  jsonText: {
    fontSize: 12,
    color: "#333333",
  },
  copyStatus: {
    fontSize: 12,
    color: "#2E7D32",
    marginBottom: 12,
  },
  modalActions: {
    gap: 10,
  },
});

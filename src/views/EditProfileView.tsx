
import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { COLORS } from "@/constants/colors";
import { typography } from "@/constants/typography";

interface EditProfileViewProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  isSaving: boolean;
  handleSave: () => void;
}

export default function EditProfileView({
  name,
  setName,
  email,
  isSaving,
  handleSave,
}: EditProfileViewProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backButton}>‹ Back</Text>
        </Pressable>

        <Text style={styles.heading}>Edit Profile</Text>

        <Text style={styles.subtitle}>
          Update your personal information
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Display Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={COLORS.gray}
          autoCapitalize="words"
          editable={!isSaving}
        />

        <Text style={styles.label}>Email Address</Text>

        <View style={styles.emailBox}>
          <Text style={styles.emailText}>
            {email || "No email available"}
          </Text>
        </View>

        <Text style={styles.note}>
          Your email address cannot be changed here.
        </Text>

        <Pressable
          style={[
            styles.saveButton,
            isSaving && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveText}>
              Save Changes
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 22,
  },
  backButton: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 20,
  },
  heading: {
    fontFamily: typography.bold,
    fontSize: 25,
    color: COLORS.darkGreen,
  },
  subtitle: {
    fontFamily: typography.regular,
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 5,
  },
  content: {
    paddingHorizontal: 22,
  },
  label: {
    fontFamily: typography.semiBold,
    fontSize: 14,
    color: COLORS.darkGreen,
    marginTop: 20,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 15,
    fontFamily: typography.regular,
    fontSize: 14,
    color: COLORS.darkGreen,
  },
  emailBox: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 15,
  },
  emailText: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: COLORS.gray,
  },
  note: {
    fontFamily: typography.regular,
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 35,
  },
  saveText: {
    fontFamily: typography.semiBold,
    fontSize: 15,
    color: COLORS.white,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

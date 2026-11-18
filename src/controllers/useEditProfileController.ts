
import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "@/config/firebase";

export function useEditProfileController() {
  const router = useRouter();
  const user = auth.currentUser;

  const [name, setName] = useState(
    user?.displayName || ""
  );

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "You are not logged in.");
      return;
    }

    try {
      setIsSaving(true);

      const updatedName = name.trim();

      // Update Firebase Authentication profile
      await updateProfile(user, {
        displayName: updatedName,
      });

      // Update Firestore user document
      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: updatedName,
        },
        { merge: true }
      );

      Alert.alert(
        "Success",
        "Your profile has been updated successfully.",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      console.log("Profile update error:", error);

      Alert.alert(
        "Update Failed",
        "Could not update your profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return {
    name,
    setName,
    email: user?.email || "",
    isSaving,
    handleSave,
  };
}

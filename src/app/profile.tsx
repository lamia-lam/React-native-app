
import React from "react";
import { useRouter } from "expo-router";

import { useProfileController } from "@/controllers/useProfileController";
import ProfileView from "@/views/ProfileView";

export default function ProfileScreen() {
  const router = useRouter();
  const controller = useProfileController();

  return (
    <ProfileView
      {...controller}
      onEditProfile={() => router.push("/edit-profile")}
    />
  );
}


import React from "react";

import { useEditProfileController } from "@/controllers/useEditProfileController";
import EditProfileView from "@/views/EditProfileView";

export default function EditProfileScreen() {
  const controller = useEditProfileController();

  return <EditProfileView {...controller} />;
}

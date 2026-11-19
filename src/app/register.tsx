import { useRegisterController } from "@/controllers/useRegisterController";
import RegisterView from "@/views/RegisterView";

export default function RegisterScreen() {
  const controller = useRegisterController();
  return <RegisterView {...controller} />;
}

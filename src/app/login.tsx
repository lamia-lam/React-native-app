import { useLoginController } from "@/controllers/useLoginController";
import LoginView from "@/views/LoginView";

export default function LoginScreen() {
  const controller = useLoginController();
  return <LoginView {...controller} />;
}

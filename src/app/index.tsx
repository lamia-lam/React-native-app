import { useRouter } from "expo-router";
import SplashView from "@/views/SplashView";

export default function SplashScreen() {
  const router = useRouter();

  return <SplashView onGetStarted={() => router.push("/login")} />;
}

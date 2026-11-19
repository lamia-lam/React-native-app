import { useHomeController } from "@/controllers/useHomeController";
import HomeView from "@/views/HomeView";

export default function HomeScreen() {
  const controller = useHomeController();
  return <HomeView {...controller} />;
}

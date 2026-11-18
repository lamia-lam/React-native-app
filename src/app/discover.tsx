import { useDiscoverController } from "@/controllers/useDiscoverController";
import DiscoverView from "@/views/DiscoverView";

export default function DiscoverScreen() {
  const controller = useDiscoverController();
  return <DiscoverView {...controller} />;
}

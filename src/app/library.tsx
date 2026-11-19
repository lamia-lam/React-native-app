
import { useLibraryController } from "@/controllers/useLibraryController";

import LibraryView from "@/views/LibraryView";

export default function LibraryScreen() {
  const controller = useLibraryController();

  return <LibraryView {...controller} />;
}

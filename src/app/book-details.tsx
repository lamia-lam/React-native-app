import { useBookDetailsController } from "@/controllers/useBookDetailsController";
import BookDetailsView from "@/views/BookDetailsView";

export default function BookDetailsScreen() {
  const controller = useBookDetailsController();

  return <BookDetailsView {...controller} />;
}
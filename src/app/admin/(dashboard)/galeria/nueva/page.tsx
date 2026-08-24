import { GalleryForm } from "../GalleryForm";
import { createGalleryItem } from "../actions";

export default function NewGalleryItemPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nueva foto</h1>
      <GalleryForm action={createGalleryItem} />
    </div>
  );
}

import { CategoryForm } from "../CategoryForm";
import { createCategory } from "../actions";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nueva categoría</h1>
      <CategoryForm action={createCategory} />
    </div>
  );
}

import { BrandForm } from "../BrandForm";
import { createBrand } from "../actions";

export default function NewBrandPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nueva marca</h1>
      <BrandForm action={createBrand} />
    </div>
  );
}

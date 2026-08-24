import { ClassForm } from "../ClassForm";
import { createClass } from "../actions";

export default function NewClassPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nueva clase</h1>
      <ClassForm action={createClass} />
    </div>
  );
}

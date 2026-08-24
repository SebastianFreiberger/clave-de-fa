import { InstrumentForm } from "../InstrumentForm";
import { createInstrument } from "../actions";

export default function NewInstrumentPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nuevo instrumento</h1>
      <InstrumentForm action={createInstrument} />
    </div>
  );
}

import { TransactionForm } from "../TransactionForm";
import { createTransaction } from "../actions";

export default function NewTransactionPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nuevo movimiento</h1>
      <TransactionForm action={createTransaction} />
    </div>
  );
}

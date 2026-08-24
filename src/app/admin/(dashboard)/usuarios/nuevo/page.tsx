import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserForm } from "../UserForm";
import { createUser } from "../actions";

export default async function NewUserPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/admin");

  return (
    <div>
      <h1 className="font-display text-3xl text-paper">Nuevo usuario</h1>
      <UserForm action={createUser} />
    </div>
  );
}

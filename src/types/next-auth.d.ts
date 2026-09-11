import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "EDITOR" | "CUSTOMER";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "ADMIN" | "EDITOR" | "CUSTOMER";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "ADMIN" | "EDITOR" | "CUSTOMER";
  }
}

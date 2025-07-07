import { Admin, User } from "../generated/prisma";

declare module "next-auth" {
  interface Session {
    user: User & Admin;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user: User & Admin;
  }
}

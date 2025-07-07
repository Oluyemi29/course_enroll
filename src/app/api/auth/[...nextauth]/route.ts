import { prisma } from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Admin, User } from "../../../../../generated/prisma";
const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        role: { label: "Role", type: "text", placeholder: "Roles" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password || !credentials.role) {
          return null;
        }
        if (credentials.role === "Admin") {
          const user = await prisma.admin.findUnique({
            where: {
              email: credentials.email,
              role: "Admin",
            },
          });
          if (!user) {
            return null;
          }
          const confirmPassword = await bcrypt.compare(
            credentials.password,
            user.password as string
          );
          if (!confirmPassword) {
            return null;
          }
          user.password = null;
          return {
            ...user,
            id: String(user.id),
          };
        } else {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
              role: "Student",
            },
          });
          if (!user) {
            return null;
          }
          const confirmPassword = await bcrypt.compare(
            credentials.password,
            user.password as string
          );
          if (!confirmPassword) {
            return null;
          }
          user.password = null;
          return {
            ...user,
            id: String(user.id),
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = { ...user, id: Number(user.id) } as User & Admin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
const handlers = NextAuth(authOptions as AuthOptions);
export { handlers as GET, handlers as POST };

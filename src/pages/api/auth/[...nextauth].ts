import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "E‑mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@exemplo.com" && credentials.password === "1234") {
          return { id: "1", name: "Admin", email: credentials.email };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);

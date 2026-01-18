import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "@/services/auth/signIn";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const result = await signIn({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!result.success) {
          return null;
        }
        return {
          id: result.data.id,
          email: result.data.email,
          name: result.data.name,
          role: result.data.role,
        };
      },
    }),
    // TODO : ADD Google Provder Later
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
    // }),
  ],
  callbacks: {
    // TODO : ADD Google Provider Later
    // async signIn({ user, account, profile }) {
    //   if (account?.provider === "google") {
    //     try {
    //       const client = await clientPromise;
    //       const db = client.db("sangharsha");
    //       const usersCollection = db.collection("users");

    //       const existingUser = await usersCollection.findOne({
    //         email: user.email,
    //       });

    //       if (!existingUser) {
    //         await usersCollection.insertOne({
    //           email: user.email,
    //           name: user.name,
    //           provider: "google",
    //           createdAt: new Date(),
    //           resumeScore: 0,
    //           appliedJobs: 0,
    //         });
    //       }
    //     } catch (error) {
    //       console.error("Error saving Google user:", error);
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret:
    process.env.NEXTAUTH_SECRET || "sangharsha-secret-key-change-in-production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const options = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 1,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          // If user doesn't input any data
          if (!credentials?.email || !credentials?.password) return null;

          // Check if the user with the given email exists
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // If not exists, fails
          if (!user) return null;

          // If exists
          // Compare Password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          const res = isPasswordValid ? user : null;

          console.log("login successful");

          return res;
        } catch (error) {
          console.log(error);
          return console.error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      try {
        const findUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (findUser) {
          console.log(findUser.id);
          console.log(user.id);
          if (user.id == findUser.id) {
            return true;
          } else {
            return "/auth/signin?error=Akun sudah terpakai";
          }
        }
      } catch (error) {
        console.log(error);
      }

      if (user) {
        return true;
      }
      return "/api/auth/error";
    },
    // async jwt({ token, user, profile }) {
    //   // token.name = user;
    //   console.log("user: " + user);
    //   console.log(await profile);
    //   console.log("jwt: " + JSON.stringify(token));
    //   return token;
    // },
    // async session({ session }) {
    //   console.log("session: " + JSON.stringify(session));
    //   return session;
    // },
  },
};

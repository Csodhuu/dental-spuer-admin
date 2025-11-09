import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    provider?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt =
          account.expires_at ?? Math.floor(Date.now() / 1000) + 3600;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      const typedToken = token as {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
        provider?: string;
      };
      session.accessToken = typedToken.accessToken;
      session.refreshToken = typedToken.refreshToken;
      session.expiresAt = typedToken.expiresAt;
      session.provider = typedToken.provider;
      return session;
    },
  },
};

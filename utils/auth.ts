import { betterAuth } from "better-auth";
import ps from "pg";


export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "localtest.me",
    },
  },
  trustedOrigins: [
    "http://example.localtest.me:3000",
    "http://auth.localtest.me:3000",
    "http://app.localtest.me:3000",
  ],

  emailAndPassword: {
    enabled: true,
  },

  database: new ps.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

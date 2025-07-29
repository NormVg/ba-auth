import { betterAuth } from "better-auth";
import ps from "pg";


export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "taohq.org",
    },
  },
  trustedOrigins: [
    "https://auth.taohq.org",
    "https://app.taohq.org",
  ],

  emailAndPassword: {
    enabled: true,
  },

  database: new ps.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

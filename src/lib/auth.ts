import { db } from "@/db"; // your drizzle instance
import { checkout, polar, portal } from "@polar-sh/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { polarClient } from "./polar";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "c037bf31-9267-4ec8-82ce-1c265de8d814",
                            slug: "Skin_Sense_AI_Pro",
                        },
                    ],
                    successUrl:
                        process.env.POLAR_SUCCESS_URL ??
                        "http://localhost:3000/scans",
                    authenticatedUsersOnly: true,
                }),
                portal(),
            ],
        }),
    ],
});

import { Polar } from "@polar-sh/sdk";

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;

if (!POLAR_ACCESS_TOKEN) {
    throw new Error("Polar variable are not configured")
}

export const polarClient = new Polar({
    accessToken: POLAR_ACCESS_TOKEN,
    server: "sandbox"
})

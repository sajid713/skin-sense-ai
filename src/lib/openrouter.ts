import { OpenRouter } from "@openrouter/sdk";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
    throw new Error("'OPENROUTER_API_KEY' is required")
}

export const openrouter = new OpenRouter({
    apiKey: OPENROUTER_API_KEY
})


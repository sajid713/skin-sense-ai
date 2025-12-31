import { InferenceClient } from '@huggingface/inference';

const HF_TOKEN = process.env.HF_TOKEN;

if (!HF_TOKEN) {
    throw new Error("'HF_TOKEN' is required")
}

export const hugging_client = new InferenceClient(HF_TOKEN);


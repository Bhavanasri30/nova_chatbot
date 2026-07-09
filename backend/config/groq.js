import Groq from "groq-sdk";
import { GROQ_API_KEY } from "./env.js";

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not set. Please add it to your backend .env file.");
}

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export { groq as default };``
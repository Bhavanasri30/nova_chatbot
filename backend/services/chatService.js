import groq from "../config/groq.js";

export const getChatResponse = async (message) => {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  return completion.choices[0].message.content;
  };
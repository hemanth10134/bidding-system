import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are an AI prediction engine for a financial market.
Analyze the user's question, which is a market proposition.
Your response MUST start with "Prediction: YES." or "Prediction: NO.".
After the initial prediction, provide a brief, confident justification of one or two sentences. Do not express uncertainty.
Example question: "Will the temperature in Delhi be above 36°C before 28 Aug 3:00PM?"
Example response: "Prediction: YES. Weather models indicate a high-pressure system moving into the region, which is expected to drive temperatures above the 36°C mark."`;


export async function getPrediction(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 1,
        topK: 1
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching prediction from Gemini API:", error);
    throw new Error("Failed to communicate with the prediction service.");
  }
}
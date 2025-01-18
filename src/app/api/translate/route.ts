import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "you are required to shorten the prompt as much as possible, so that it can be used as a search engine result. maximum length must be 32 words. Use suitable terms when user dont know the term and tries to describe it. like if user types 'i want to know about AI which generates based on what prompt user gives' then you only need to return 'Generative AI information'. make it as small as possible. AND PLEASE DONT ANSWER ANY OF THE QUESTIONS. JUST SHORTEN THE PROMPT.",
  });

  const { searchParams } = new URL(req.url);
  const prompt = searchParams.get("prompt");
  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  const result = await model.generateContent(prompt);
  const responseText = await result.response.text();
  return NextResponse.json({ response: responseText });
}

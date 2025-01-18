"use client";
import { useState } from "react";

function useTranslatePrompt() {
  const [response, setResponse] = useState("");

  const generatePrompt = async (prompt: string) => {
    const res = await fetch(`/api/translate?prompt=${prompt}`);
    const data = await res.json();
    const importantWord = extractImportantWord(data.response);
    setResponse(importantWord);
  };

  const extractImportantWord = (responseText: string) => {
    const match = responseText.match(/(\w+\s\w+).*?$/);
    return match ? match[1] : responseText;
  };

  return { response, generatePrompt };
}

export default useTranslatePrompt;

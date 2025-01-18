import { Card } from "@/components/ui/card";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function Page({
  params,
}: {
  params: Promise<{ prompt: string }>;
}) {
  const prompt = (await params).prompt;

  // Initialize the Gemini API client
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // Use the API key from env variable
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "Use HTML tags to format the response, but do not use the ```html start and ``` end tags. Use <b> for bold text and <i> for italic text. Use <br> for new lines.",
  });

  try {
    // Generate content using the AI model
    const result = await model.generateContent(prompt);

    // Log the result for debugging purposes
    const rawContent = result.response.text(); // This is where the text response is accessed

    // Display the result in the component
    return (
      <Card className=" m-20 p-10 mt-10">
        <h1 className="text-3xl font-bold text-center text-foreground/70 mb-10">
          {decodeURIComponent(prompt)}
        </h1>
        <div
          className="text-lg space-y-4"
          dangerouslySetInnerHTML={{
            __html: rawContent,
          }}
        />
      </Card>
    );
  } catch (error) {
    console.error("Error generating content:", error);
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-red-600">
          Error Generating Content
        </h1>
        <p className="text-xl text-gray-800 font-medium mb-4">
          There was an error while generating the content. Please try again
          later.
        </p>
      </div>
    );
  }
}

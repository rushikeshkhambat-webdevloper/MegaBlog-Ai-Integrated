import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
});

const WORKING_MODEL = "openai/gpt-oss-120b";

// 1. AI Content Writer (with Streaming)
export const generateContent = async (title, onChunk) => {
    try {
        const stream = await groq.chat.completions.create({
            model: WORKING_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are a professional blog writer. Write HTML-formatted blog posts (h2, p, ul, strong) that can be directly inserted into a rich text editor.",
                },
                {
                    role: "user",
                    content: `Write a detailed, engaging blog post about "${title}". Use HTML formatting. Keep it under 400 words.`,
                },
            ],
            max_tokens: 1024,
            temperature: 0.7,
            stream: true,
        });

        let fullText = "";
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            fullText += content;
            if (onChunk) onChunk(fullText);
        }
        return fullText;
    } catch (error) {
        console.error("❌ AI Writer Error:", error);
        return null;
    }
};

// 2. AI Summary + Tags (COMBINED)
export const generateSummaryAndTags = async (content) => {
    try {
        const response = await groq.chat.completions.create({
            model: WORKING_MODEL,
            messages: [
                {
                    role: "user",
                    content: `Analyze the following blog post and return a JSON object with two fields: "summary" (2-3 sentences) and "tags" (comma-separated string of 3-5 tags). Return ONLY valid JSON, no markdown.\n\nBlog post:\n${content}`,
                },
            ],
            max_tokens: 800,
            temperature: 0.5,
            response_format: { type: "json_object" },
        });

        const parsed = JSON.parse(response.choices[0].message.content);
        return {
            summary: parsed.summary || "",
            tags: parsed.tags || "",
        };
    } catch (error) {
        console.error("AI Summary+Tags Error:", error);
        return { summary: "", tags: "" };
    }
};

// 3. AI Chatbot
export const chatWithAI = async (question, allPostsContext) => {
    try {
        const response = await groq.chat.completions.create({
            model: WORKING_MODEL,
            messages: [
                {
                    role: "system",
                    content: `You are a friendly assistant for a blog. Answer based on the blog posts provided. Keep answers short (2-4 sentences). Only say "I don't have information about that" if the question is completely unrelated to the blog posts.`,
                },
                {
                    role: "user",
                    content: `BLOG POSTS:\n${allPostsContext}\n\nUSER QUESTION: ${question}`,
                },
            ],
            max_tokens: 300,
            temperature: 0.6,
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("AI Chatbot Error:", error);
        return "Sorry, I am having trouble answering right now.";
    }
};
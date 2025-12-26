require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function verifyApiKey() {
    const API_KEY = process.env.API_KEY;
    if (!API_KEY || API_KEY === "YOUR_API_KEY") {
        console.error("API_KEY is not set. Please check your .env file.");
        process.exit(1);
    }

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("test");
        const response = await result.response;
        console.log("API Key is valid. Model response:", response.text());
        process.exit(0);
    } catch (error) {
        console.error("Error verifying API Key:", error.message);
        process.exit(1);
    }
}

verifyApiKey();

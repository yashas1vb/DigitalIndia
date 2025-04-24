import { GoogleGenerativeAI } from '@google/generative-ai';

// Replace this with your new API key from Google Cloud Console
const API_KEY = '';

const genAI = new GoogleGenerativeAI(API_KEY);

export const getGeminiModel = () => {
    return genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1024,
        },
    });
};

const isDateQuestion = (prompt) => {
    const promptLower = prompt.toLowerCase();
    const datePatterns = [
        /what.*date.*today/i,
        /what.*day.*today/i,
        /what.*time.*now/i,
        /current.*date/i,
        /current.*time/i,
        /today.*date/i,
        /today.*day/i
    ];

    return datePatterns.some(pattern => pattern.test(promptLower));
};

const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const generateResponse = async (prompt) => {
    try {
        // Check if it's a date-related question
        if (isDateQuestion(prompt)) {
            return `Today is ${getCurrentDate()}`;
        }

        const model = getGeminiModel();
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        if (!result.response) {
            throw new Error('No response from Gemini API');
        }

        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating response:', error);
        if (error.message.includes('API key')) {
            return 'Error: Invalid API key. Please check your configuration.';
        } else if (error.message.includes('quota')) {
            return 'Error: API quota exceeded. Please try again later.';
        } else if (error.message.includes('model')) {
            return 'Error: Model not found. Please check your configuration.';
        } else if (error.message.includes('timeout')) {
            return 'Error: Request timed out. Please try again.';
        } else {
            return 'Sorry, I encountered an error. Please try again.';
        }
    }
}; 

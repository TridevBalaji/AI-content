import { generateObject } from 'ai'; // Import the AI SDK for generating objects
import { createGoogleGenerativeAI } from '@ai-sdk/google'; // Ensure correct AI SDK import
import { z } from 'zod'; // Import Zod for schema validation

// Initialize Google Gemini AI with your API key (stored securely in environment variables)
const google = createGoogleGenerativeAI({
    apiKey: 'AIzaSyA6wQcWglcK3oZ-X4v_GUbVVZpmQnhZIKg', // API key should be accessed from environment variables
});

// Define the system prompt with specific instructions
const systemPrompt = `
persona: You are an AI assistant specialized in healthcare, capable of answering only healthcare-related questions. You can provide information about various diseases, medical conditions, treatments, and medications, as well as general health advice.

instructions: If a user asks a non-healthcare-related question, respond with: "I can only assist with healthcare-related topics. Please ask about diseases, treatments, or medications."
`;

// Define the schema using Zod for validation
const schema = z.object({
    response: z.object({
        message: z.string(),
        suggestions: z.array(z.string()).optional(),
        metadata: z.object({
            confidence: z.number().min(0).max(1),
            category: z.string(),
        }).optional(),
    }),
});

export async function continueConversation(history) {
    // Combine the system prompt with the conversation history
    const combinedPrompt = `${systemPrompt}\nUser: ${history.map((msg) => msg.content).join('\nUser: ')}`;

    try {
        // Use generateObject() to generate a structured response from the model
        const result = await generateObject({
            model: google('gemini-1.5-pro-002'),
            prompt: combinedPrompt, // Combine system instructions with conversation history
            schema: schema, // Use schema to validate the AI response structure
        });

        let newMessages = [...history]; // Track conversation history

        if (result && result.object && result.object.response.message) {
            // Update the conversation history with the latest AI response
            const aiMessage = {
                role: 'assistant',
                content: result.object.response.message,
            };

            newMessages.push(aiMessage);
        }

        // Return the updated conversation history
        return {
            messages: newMessages,
        };
    } catch (error) {
        console.error('Error during conversation continuation:', error);
        throw new Error('Failed to generate AI response');
    }
}
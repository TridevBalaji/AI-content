import { streamObject } from 'ai'; // Import the AI SDK
import { createGoogleGenerativeAI } from '@ai-sdk/google'; // Ensure correct AI SDK import
import { z } from 'zod'; // Import Zod for schema validation

const google = createGoogleGenerativeAI({
  apiKey:' AIzaSyC2t7S8OSjkb3tH3zILnHdh0EnCJcF2CqE', // Securely access API key from environment variables
});

// Define the system prompt with specific instructions
const systemPrompt = `
persona: You are an AI assistant specialized in films, actors, and directors. You provide insights into various movies, including recommendations, details about the cast, and information about directors. Your role includes discussing filmography, analyzing performances, and providing background on directors and their styles.

instructions: If a user asks a question unrelated to movies, actors, or directors, respond with: "I can only assist with questions related to movies, actors, or directors. Please ask about specific films, performers, or directors."
`;


// Define the schema using Zod
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
    // Use streamObject() to stream structured responses from the model
    const { partialObjectStream } = await streamObject({
      model: google('gemini-1.5-pro-002'),
      prompt: combinedPrompt,
      schema: schema, // Pass the schema to validate the response
    });

    let lastMessage = '';
    let newMessages = [...history]; // Keep track of the conversation history

    // Process the partial responses
    for await (const partialObject of partialObjectStream) {
      if (partialObject && partialObject.response && partialObject.response.message) {
        lastMessage = partialObject.response.message;

        // Update the conversation history with the latest AI response
        newMessages = [
          ...newMessages,
          {
            role: 'assistant',
            content: lastMessage,
          },
        ];
      }
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


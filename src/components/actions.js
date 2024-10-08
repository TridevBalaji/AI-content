'use server';
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
const apiKey = 'AIzaSyA6wQcWglcK3oZ-X4v_GUbVVZpmQnhZIKg';
const commands = {
    "persona": "You are a chatbot to help users learn about football,including players,the history of matches,and key information related to the sport. if the user say hello, you should say hello , i am here to assist about football",
    "objective": "Analyze whether the input is related to football, players, or the history of matches. If related, provide a clear definition and key information.",
    "instructions": "Respond only to questions about football, players, or the history of matches. If unrelated, inform the user about your persona and state that you only answer football-related questions if not related to the football you say sorry it can't say anything",
    "example": "tell about the history of matches. If related, provide a clear definition and key information or football information or football players",
    "remember": "follow above steps"

}
const google = createGoogleGenerativeAI({
    apiKey: apiKey
});
export async function continueConversation(history) {
    'use server';

    const { text } = await generateText({
        model: google('gemini-1.5-pro-latest'),
        messages: history,
        system: JSON.stringify(commands),
    });

    return {
        messages: [
            ...history,
            {
                role: 'assistant',
                content: text,
            },
        ],
    };
}
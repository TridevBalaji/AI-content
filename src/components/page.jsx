'use client';

import { useState } from 'react';
import { continueConversation } from './actions'; // Adjust this path as necessary
import Markdown from 'markdown-to-jsx'; // Ensure you have the right import for Markdown-to-jsx
import './globals.css';
export const maxDuration = 30;

export default function Page() {
    const [conversation, setConversation] = useState([]);
    const [input, setInput] = useState('');

    return (
        <div className='page'>
        <div className="chat-container">
            <div className="chat-box"> 
                {conversation.map((message, index) => (
                    <div key={index}>
                        <Markdown>{`${message.role}: ${message.content}`}</Markdown>
                    </div>
                ))}
            </div>

            <div className="input-box"> 
                <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Type your message here..." // Optional placeholder
                />
                <button
                    onClick={async () => {
                        const { messages } = await continueConversation([
                            ...conversation,
                            { role: 'user', content: input },
                        ]);
                        setConversation(messages);
                        setInput(''); // Clear input after sending
                    }}
                >
                    Send Message
                </button>
            </div>
        </div>
        </div>
    );
}

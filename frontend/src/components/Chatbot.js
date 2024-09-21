// Chatbot.js
import React, { useState } from 'react';

const personalities = {
    casual: 'Hey! How can I help you with your shopping today?',
    formal: 'Good day! How may I assist you with your purchases?',
    humorous: 'Let’s go shopping! Ready to find some great deals?',
};

const Chatbot = ({ personalityType }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        setMessages([...messages, { user: 'You', text: input }, { user: 'Bot', text: getBotResponse(input) }]);
        setInput('');
    };

    const getBotResponse = (input) => {
        return `I think you might like some cool products related to "${input}"!`;
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">Shopping Assistant</div>
            <div className="chatbot-messages">
                {messages.map((msg, i) => (
                    <div key={i} className={msg.user === 'You' ? 'user-message' : 'bot-message'}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chatbot;

import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import axios from 'axios';
import { ChatMessage } from './ChatMessage';
import { Message, ChatState } from '../types';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ChatContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    position: relative;
`;

const MessagesContainer = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background-color: transparent;
    margin-bottom: 1rem;
    scroll-behavior: smooth;

    /* Custom Scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(129, 140, 248, 0.3) transparent;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(129, 140, 248, 0.3);
        border-radius: 20px;
        border: transparent;
        
        &:hover {
            background-color: rgba(129, 140, 248, 0.5);
        }
    }

    /* Add space for the gradient overlay */
    padding-top: 2rem;
`;

const InputContainer = styled.div`
    display: flex;
    gap: 0.75rem;
    padding: 1.25rem;
    margin: 0 1rem 1rem;
    background: rgba(31, 41, 55, 0.5);
    border: 1px solid rgba(129, 140, 248, 0.2);
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.05);
    animation: ${fadeIn} 0.3s ease-out;
`;

const Input = styled.input`
    flex-grow: 1;
    padding: 0.75rem 1rem;
    background: rgba(17, 24, 39, 0.4);
    border: 1px solid rgba(129, 140, 248, 0.2);
    border-radius: 0.75rem;
    color: #e5e7eb;
    font-size: 0.9375rem;
    transition: all 0.2s ease-in-out;
    
    &::placeholder {
        color: #6b7280;
    }
    
    &:focus {
        outline: none;
        border-color: rgba(129, 140, 248, 0.4);
        background: rgba(17, 24, 39, 0.5);
        box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.1);
    }
`;

const SendButton = styled.button<{ disabled: boolean }>`
    padding: 0.75rem 1.25rem;
    background: ${props => props.disabled ? 
        'rgba(75, 85, 99, 0.2)' : 
        'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)'};
    color: ${props => props.disabled ? '#6b7280' : '#ffffff'};
    border: none;
    border-radius: 0.75rem;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-size: 0.9375rem;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    }
    
    &:active:not(:disabled) {
        transform: translateY(0);
    }

    svg {
        width: 1.25rem;
        height: 1.25rem;
        transition: transform 0.2s ease-in-out;
    }

    &:hover:not(:disabled) svg {
        transform: translateX(2px);
    }
`;

const bounce = keyframes`
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
`;

const LoadingContainer = styled.div`
    display: flex;
    gap: 4px;
    padding: 0.75rem 1rem;
    background: rgba(31, 41, 55, 0.4);
    border: 1px solid rgba(129, 140, 248, 0.2);
    border-radius: 1rem;
    width: fit-content;
    margin: 1rem 0;
    animation: ${fadeIn} 0.3s ease-out;
`;

const LoadingDot = styled.div`
    width: 6px;
    height: 6px;
    background: linear-gradient(135deg, #4F46E5 0%, #818CF8 100%);
    border-radius: 50%;
    animation: ${bounce} 1s infinite;

    &:nth-of-type(2) {
        animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
        animation-delay: 0.4s;
    }
`;

const WelcomeMessage = styled.div`
    text-align: center;
    color: #9ca3af;
    font-size: 0.875rem;
    margin: 2rem 0;
    padding: 0 1rem;
    animation: ${fadeIn} 0.5s ease-out;

    strong {
        color: #e5e7eb;
        display: block;
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
`;

const LoadingIndicator = () => (
    <LoadingContainer>
        <LoadingDot />
        <LoadingDot />
        <LoadingDot />
    </LoadingContainer>
);

export const Chat: React.FC = () => {
    const [state, setState] = useState<ChatState>({
        messages: [],
        isLoading: false
    });
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [state.messages]);

    const handleSend = async () => {
        if (!input.trim() || state.isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input.trim(),
            sender: 'user',
            timestamp: new Date()
        };

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, userMessage],
            isLoading: true
        }));
        setInput('');

        try {
            const response = await axios.post('http://localhost:5000/api/chat', {
                message: userMessage.text
            });

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.data.response,
                sender: 'bot',
                timestamp: new Date()
            };

            setState(prev => ({
                ...prev,
                messages: [...prev.messages, botMessage],
                isLoading: false
            }));
        } catch (error) {
            console.error('Error sending message:', error);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <ChatContainer>
            <MessagesContainer>
                {state.messages.length === 0 && (
                    <WelcomeMessage>
                        <strong>Welcome to E-Learning Assistant! 👋</strong>
                        I'm here to help you create personalized learning paths and answer your educational questions.
                    </WelcomeMessage>
                )}
                {state.messages.map(message => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                {state.isLoading && <LoadingIndicator />}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <InputContainer>
                <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about any topic you want to learn..."
                    disabled={state.isLoading}
                />
                <SendButton 
                    onClick={handleSend} 
                    disabled={!input.trim() || state.isLoading}
                >
                    Send
                    <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            d="M14.7071 8.70711C15.0976 8.31658 15.0976 7.68342 14.7071 7.29289L8.34315 0.928932C7.95262 0.538408 7.31946 0.538408 6.92893 0.928932C6.53841 1.31946 6.53841 1.95262 6.92893 2.34315L12.5858 8L6.92893 13.6569C6.53841 14.0474 6.53841 14.6805 6.92893 15.0711C7.31946 15.4616 7.95262 15.4616 8.34315 15.0711L14.7071 8.70711ZM0 9H14V7H0V9Z" 
                            fill="currentColor"
                        />
                    </svg>
                </SendButton>
            </InputContainer>
        </ChatContainer>
    );
}; 
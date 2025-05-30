import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import axios from 'axios';
import { ChatMessage } from './ChatMessage';
import { Message, ChatState } from '../types';

const ChatContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: transparent;
`;

const MessagesContainer = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: transparent;
    margin-bottom: 10px;

    /* Custom Scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(75, 85, 99, 0.5) transparent;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(75, 85, 99, 0.5);
        border-radius: 20px;
        border: transparent;
    }
`;

const InputContainer = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    background-color: rgba(17, 24, 39, 0.7);
    border: 1px solid rgba(75, 85, 99, 0.5);
    border-radius: 12px;
    backdrop-filter: blur(8px);
`;

const Input = styled.input`
    flex-grow: 1;
    padding: 12px;
    background-color: transparent;
    border: none;
    color: #e5e7eb;
    font-size: 0.875rem;
    
    &::placeholder {
        color: #6b7280;
    }
    
    &:focus {
        outline: none;
    }
`;

const SendButton = styled.button<{ disabled: boolean }>`
    padding: 8px 16px;
    background-color: ${props => props.disabled ? 'rgba(75, 85, 99, 0.2)' : 'rgba(75, 85, 99, 0.3)'};
    color: ${props => props.disabled ? '#6b7280' : '#e5e7eb'};
    border: 1px solid ${props => props.disabled ? 'rgba(75, 85, 99, 0.2)' : 'rgba(75, 85, 99, 0.5)'};
    border-radius: 8px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-size: 0.875rem;
    transition: all 0.2s ease-in-out;
    
    &:hover:not(:disabled) {
        background-color: rgba(75, 85, 99, 0.4);
        border-color: rgba(75, 85, 99, 0.6);
    }
    
    &:active:not(:disabled) {
        transform: scale(0.98);
    }
`;

const bounce = keyframes`
    0%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-6px); }
`;

const LoadingContainer = styled.div`
    display: flex;
    gap: 4px;
    padding: 8px 12px;
    background-color: rgba(55, 65, 81, 0.3);
    border: 1px solid rgba(75, 85, 99, 0.5);
    border-radius: 12px;
    width: fit-content;
    margin: 8px 0;
`;

const LoadingDot = styled.div`
    width: 6px;
    height: 6px;
    background-color: #818cf8;
    border-radius: 50%;
    animation: ${bounce} 1s infinite;

    &:nth-of-type(2) {
        animation-delay: 0.2s;
    }

    &:nth-of-type(3) {
        animation-delay: 0.4s;
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
                {state.messages.map(message => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                {state.isLoading && <LoadingIndicator />}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <InputContainer>
                <Input
                    value={input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={state.isLoading}
                />
                <SendButton
                    onClick={handleSend}
                    disabled={state.isLoading || !input.trim()}
                >
                    {state.isLoading ? 'Sending...' : 'Send'}
                </SendButton>
            </InputContainer>
        </ChatContainer>
    );
}; 
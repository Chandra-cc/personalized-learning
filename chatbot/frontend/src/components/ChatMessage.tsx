import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Message } from '../types';

interface StyledProps {
    isUser: boolean;
}

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const MessageContainer = styled.div<StyledProps>`
    display: flex;
    justify-content: ${(props: StyledProps) => props.isUser ? 'flex-end' : 'flex-start'};
    margin: 1.25rem 0;
    gap: 1rem;
    align-items: flex-start;
    animation: ${slideIn} 0.3s ease-out;
`;

const Avatar = styled.div<StyledProps>`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 1rem;
    background: ${props => props.isUser ? 
        'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)' : 
        'linear-gradient(135deg, #1F2937 0%, #374151 100%)'};
    border: 2px solid ${props => props.isUser ? 
        'rgba(129, 140, 248, 0.3)' : 
        'rgba(55, 65, 81, 0.3)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    order: ${props => props.isUser ? 1 : 0};
    box-shadow: 0 2px 6px ${props => props.isUser ? 
        'rgba(79, 70, 229, 0.2)' : 
        'rgba(31, 41, 55, 0.2)'};
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px ${props => props.isUser ? 
            'rgba(79, 70, 229, 0.3)' : 
            'rgba(31, 41, 55, 0.3)'};
    }
`;

const MessageContent = styled.div<StyledProps>`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 70%;
`;

const MessageBubble = styled.div<StyledProps>`
    background: ${(props: StyledProps) => props.isUser ? 
        'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)' : 
        'linear-gradient(135deg, rgba(31, 41, 55, 0.1) 0%, rgba(55, 65, 81, 0.1) 100%)'};
    color: ${(props: StyledProps) => props.isUser ? '#e5e7eb' : '#d1d5db'};
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    word-wrap: break-word;
    border: 1px solid ${(props: StyledProps) => props.isUser ? 
        'rgba(129, 140, 248, 0.2)' : 
        'rgba(55, 65, 81, 0.2)'};
    backdrop-filter: blur(10px);
    transition: all 0.2s ease-in-out;
    font-size: 0.9375rem;
    line-height: 1.5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
        background: ${(props: StyledProps) => props.isUser ? 
            'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%)' : 
            'linear-gradient(135deg, rgba(31, 41, 55, 0.15) 0%, rgba(55, 65, 81, 0.15) 100%)'};
        border-color: ${(props: StyledProps) => props.isUser ? 
            'rgba(129, 140, 248, 0.3)' : 
            'rgba(55, 65, 81, 0.3)'};
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

const MessageHeader = styled.div<StyledProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
    justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const SenderName = styled.span<StyledProps>`
    font-size: 0.75rem;
    font-weight: 500;
    color: ${props => props.isUser ? '#818CF8' : '#9CA3AF'};
`;

const Timestamp = styled.span<StyledProps>`
    font-size: 0.75rem;
    color: #6B7280;
    text-align: ${props => props.isUser ? 'right' : 'left'};
    margin-top: 0.25rem;
`;

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    return (
        <MessageContainer isUser={isUser}>
            <Avatar isUser={isUser}>
                {isUser ? '👤' : '🤖'}
            </Avatar>
            <MessageContent isUser={isUser}>
                <MessageHeader isUser={isUser}>
                    <SenderName isUser={isUser}>
                        {isUser ? 'You' : 'E-Learning Assistant'}
                    </SenderName>
                </MessageHeader>
                <MessageBubble isUser={isUser}>
                    {message.text}
                </MessageBubble>
                <Timestamp isUser={isUser}>
                    {formattedTime}
                </Timestamp>
            </MessageContent>
        </MessageContainer>
    );
}; 
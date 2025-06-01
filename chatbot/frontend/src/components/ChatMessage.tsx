import styled from '@emotion/styled';
import { Message } from '../types';

interface StyledProps {
    isUser: boolean;
}

const MessageContainer = styled.div<StyledProps>`
    display: flex;
    justify-content: ${(props: StyledProps) => props.isUser ? 'flex-end' : 'flex-start'};
    margin: 8px 0;
    gap: 8px;
    align-items: flex-start;
`;

const Avatar = styled.div<StyledProps>`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${props => props.isUser ? 'rgba(75, 85, 99, 0.3)' : 'rgba(79, 70, 229, 0.2)'};
    border: 1px solid ${props => props.isUser ? 'rgba(75, 85, 99, 0.5)' : 'rgba(79, 70, 229, 0.3)'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.isUser ? '#e5e7eb' : '#818cf8'};
    font-size: 0.75rem;
    font-weight: 500;
    order: ${props => props.isUser ? 1 : 0};
`;

const MessageBubble = styled.div<StyledProps>`
    background-color: ${(props: StyledProps) => props.isUser ? 'rgba(75, 85, 99, 0.3)' : 'rgba(55, 65, 81, 0.3)'};
    color: ${(props: StyledProps) => props.isUser ? '#e5e7eb' : '#d1d5db'};
    padding: 12px 16px;
    border-radius: 12px;
    max-width: calc(70% - 36px);
    word-wrap: break-word;
    border: 1px solid ${(props: StyledProps) => props.isUser ? 'rgba(75, 85, 99, 0.5)' : 'rgba(55, 65, 81, 0.5)'};
    backdrop-filter: blur(8px);
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${(props: StyledProps) => props.isUser ? 'rgba(75, 85, 99, 0.4)' : 'rgba(55, 65, 81, 0.4)'};
        border-color: ${(props: StyledProps) => props.isUser ? 'rgba(75, 85, 99, 0.6)' : 'rgba(55, 65, 81, 0.6)'};
    }
`;

const Timestamp = styled.span`
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 4px;
    display: block;
`;

const BotName = styled.span`
    font-size: 0.75rem;
    color: #818cf8;
    margin-bottom: 2px;
    display: block;
`;

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    
    return (
        <MessageContainer isUser={isUser}>
            <Avatar isUser={isUser}>
                {isUser ? 'U' : '🤖'}
            </Avatar>
            <MessageBubble isUser={isUser}>
                {!isUser && <BotName>Elai</BotName>}
                {message.text}
                <Timestamp>
                    {new Date(message.timestamp).toLocaleTimeString()}
                </Timestamp>
            </MessageBubble>
        </MessageContainer>
    );
}; 
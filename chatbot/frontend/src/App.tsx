import React, { useState } from 'react';
import { Chat } from './components/Chat';
import styled from '@emotion/styled';

const ChatButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.5);
  color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(8px);
  z-index: 50;

  &:hover {
    transform: scale(1.05);
    background-color: rgba(31, 41, 55, 0.8);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ChatWindow = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  width: 24rem;
  height: 32rem;
  background-color: rgba(17, 24, 39, 0.85);
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 1rem;
  backdrop-filter: blur(8px);
  transform: ${props => props.isOpen ? 'translateY(0) scale(1)' : 'translateY(1rem) scale(0.95)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.2s ease-in-out;
  z-index: 49;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(75, 85, 99, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatTitle = styled.h3`
  color: #e5e7eb;
  font-size: 0.875rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #e5e7eb;
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const ChatContent = styled.div`
  height: calc(100% - 3.5rem);
`;

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <ChatButton onClick={toggleChat} aria-label="Toggle chat">
        💬
      </ChatButton>

      <ChatWindow isOpen={isChatOpen}>
        <ChatHeader>
          <ChatTitle>E-Learning.ai Assistant</ChatTitle>
          <CloseButton onClick={toggleChat} aria-label="Close chat">
            ✕
          </CloseButton>
        </ChatHeader>
        <ChatContent>
          <Chat />
        </ChatContent>
      </ChatWindow>
    </>
  );
}

export default App;

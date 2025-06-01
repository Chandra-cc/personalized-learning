import React, { useState } from 'react';
import { Chat } from './components/Chat';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(129, 140, 248, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(129, 140, 248, 0); }
  100% { box-shadow: 0 0 0 0 rgba(129, 140, 248, 0); }
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #4F46E5 0%, #818CF8 100%);
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  z-index: 50;
  animation: ${pulseAnimation} 2s infinite;

  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
`;

const ChatWindow = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 7rem;
  right: 2rem;
  width: 28rem;
  height: 38rem;
  background: rgba(17, 24, 39, 0.95);
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 1.5rem;
  backdrop-filter: blur(20px);
  animation: ${props => props.isOpen ? slideIn : slideOut} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  z-index: 49;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.05);
`;

const ChatHeader = styled.div`
  padding: 1.25rem;
  background: linear-gradient(to right, rgba(79, 70, 229, 0.1), rgba(129, 140, 248, 0.1));
  border-bottom: 1px solid rgba(129, 140, 248, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(10px);
`;

const ChatTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Logo = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(135deg, #4F46E5 0%, #818CF8 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.h3`
  color: #e5e7eb;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const Subtitle = styled.span`
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const CloseButton = styled.button`
  background: rgba(75, 85, 99, 0.2);
  border: 1px solid rgba(75, 85, 99, 0.3);
  color: #e5e7eb;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(75, 85, 99, 0.3);
    border-color: rgba(75, 85, 99, 0.4);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const ChatContent = styled.div`
  height: calc(100% - 4.5rem);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2rem;
    background: linear-gradient(to bottom, rgba(17, 24, 39, 0.95), transparent);
    pointer-events: none;
    z-index: 1;
  }
`;

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <ChatButton onClick={toggleChat} aria-label="Toggle chat">
        {isChatOpen ? '✕' : '💬'}
      </ChatButton>

      <ChatWindow isOpen={isChatOpen}>
        <ChatHeader>
          <ChatTitle>
            <Logo>🎓</Logo>
            <TitleText>
              <MainTitle>E-Learning Assistant</MainTitle>
              <Subtitle>Powered by AI</Subtitle>
            </TitleText>
          </ChatTitle>
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

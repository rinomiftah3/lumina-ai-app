/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { ChatInterface } from './components/ChatInterface';
import { StudyMode, Message } from './types';
import { sendMessageStream } from './services/geminiService';

export default function App() {
  const [currentMode, setCurrentMode] = useState<StudyMode>('landing');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleModeChange = useCallback((mode: StudyMode) => {
    setCurrentMode(mode);
    setMessages([]); // Clear chat for new mode context
  }, []);

  const handleStartFromLanding = useCallback((mode: Exclude<StudyMode, 'landing'>) => {
    setCurrentMode(mode);
    setMessages([]);
  }, []);

  const handleNewSession = useCallback(() => {
    setMessages([]);
    setCurrentMode('landing');
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    if (currentMode === 'landing') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const assistantId = (Date.now() + 1).toString();
      let assistantContent = '';
      
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      
      for await (const chunk of sendMessageStream(currentMode as any, content, history)) {
        assistantContent += chunk;
        setMessages(prev => {
          const existing = prev.find(m => m.id === assistantId);
          if (existing) {
            return prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m);
          } else {
            return [...prev, { id: assistantId, role: 'assistant', content: assistantContent, timestamp: Date.now() }];
          }
        });
        setIsTyping(false); // Stop typing as soon as first chunk arrives
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { 
        id: 'error-' + Date.now(), 
        role: 'assistant', 
        content: '_Sorry, I encountered an error. Please try again or check your API key._', 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [currentMode, messages]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface mesh-gradient">
      <Sidebar 
        currentMode={currentMode} 
        onModeChange={handleModeChange} 
        onNewSession={handleNewSession}
      />
      
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        {currentMode === 'landing' ? (
          <LandingPage onStart={handleStartFromLanding} />
        ) : (
          <ChatInterface 
            mode={currentMode as Exclude<StudyMode, 'landing'>} 
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
          />
        )}
      </main>
    </div>
  );
}


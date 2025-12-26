import { useEffect, useState } from 'react';
import { getChats, getMessages } from '../../api/chat.api';
import { useTaskSocket } from '../../hooks/useTaskSocket';

import type { ChatMessage, ChatTask } from './ChatUtils/chatTypes';

import ChatList from './ChatUtils/ChatList';
import MessageBubble from './ChatUtils/MessageBubble';
import ChatInput from './ChatUtils/ChatInput';

export default function Messages() {
  const [chats, setChats] = useState<ChatTask[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [text, setText] = useState('');

  // ✅ READ ONCE – NO STATE, NO EFFECT
  const currentUserId: string | null = (() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user?.id ?? null;
    } catch {
      return null;
    }
  })();

  const socketRef = useTaskSocket();

  /* -------------------------------
     Load chat list
  -------------------------------- */
  useEffect(() => {
    getChats().then(setChats);
  }, []);

  /* -------------------------------
     Listen for incoming messages
  -------------------------------- */
  useEffect(() => {
    if (!socketRef.current) return;

    const handleMessage = (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    };

    socketRef.current.on('chat:message', handleMessage);

    return () => {
      socketRef.current?.off('chat:message', handleMessage);
    };
  }, [socketRef]);

  /* -------------------------------
     Open chat
  -------------------------------- */
  const openChat = async (taskId: string) => {
    setActiveTask(taskId);

    const msgs = await getMessages(taskId);
    setMessages(msgs);

    socketRef.current?.emit('task:join', taskId);
  };

  /* -------------------------------
     Send message
  -------------------------------- */
  const send = () => {
    // if (!activeTask || !text.trim()) return;

    socketRef.current?.emit('chat:send', {
      taskId: activeTask||'8',
      content: text,
    });

    setText('');
  };

  return (
    <div className="flex bg-white border rounded-2xl h-[650px] overflow-hidden">
      {/* Chat List */}
      <ChatList
        chats={chats}
        activeTask={activeTask}
        onSelect={openChat}
      />

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          {!activeTask && (
            <p className="text-gray-400 text-sm text-center mt-10">
              Select a chat to start messaging
            </p>
          )}

          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.sender?.id === currentUserId}
            />
          ))}
        </div>

        {!activeTask && (
          <ChatInput
            value={text}
            onChange={setText}
            onSend={send}
          />
        )}
      </div>
    </div>
  );
}

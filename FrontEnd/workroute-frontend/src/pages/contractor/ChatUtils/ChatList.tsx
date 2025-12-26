import type { ChatTask } from './chatTypes';

type Props = {
  chats: ChatTask[];
  activeTask: string | null;
  onSelect: (taskId: string) => void;
};

export default function ChatList({ chats, activeTask, onSelect }: Props) {
  return (
    <div className="w-64 border-r bg-gray-50 p-3 space-y-1">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Chats</h3>

      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelect(chat.id)}
          className={`p-2 rounded-lg cursor-pointer text-sm ${
            activeTask === chat.id
              ? 'bg-indigo-100 text-indigo-700'
              : 'hover:bg-gray-100'
          }`}
        >
          {chat.title}
        </div>
      ))}
    </div>
  );
}

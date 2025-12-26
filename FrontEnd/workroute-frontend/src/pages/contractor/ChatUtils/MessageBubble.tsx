import type { ChatMessage } from "./chatTypes";

type Props = {
  message: ChatMessage;
  isOwn: boolean;
};

export default function MessageBubble({ message, isOwn }: Props) {
  return (
    <div
      className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
        isOwn
          ? 'ml-auto bg-indigo-600 text-white'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      {!isOwn && (
        <p className="text-xs font-semibold mb-1">
          {message.sender.name}
        </p>
      )}
      {message.content}
    </div>
  );
}

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
};

export default function ChatInput({ value, onChange, onSend }: Props) {
  return (
    <div className="p-4 border-t flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={onSend}
        className="bg-indigo-600 text-white px-5 rounded-xl hover:bg-indigo-700"
      >
        Send
      </button>
    </div>
  );
}

type FeedbackCardProps = {
  name: string;
  comment: string;
  rating: number; // 1 - 5
};

export default function FeedbackCard({
  name,
  comment,
  rating,
}: FeedbackCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-gray-700 text-sm">
        “{comment}”
      </p>

      <div className="mt-2 text-xs text-gray-500 flex justify-between">
        <span>— {name}</span>
        <span>{'⭐'.repeat(rating)}</span>
      </div>
    </div>
  );
}

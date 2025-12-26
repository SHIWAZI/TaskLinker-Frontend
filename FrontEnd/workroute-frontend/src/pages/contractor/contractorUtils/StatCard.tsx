type StatCardProps = {
  title: string;
  value: string | number;
  accent?: 'indigo' | 'green' | 'yellow' | 'blue';
};

export default function StatCard({
  title,
  value,
  accent = 'indigo',
}: StatCardProps) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-700',
    green: 'bg-green-50 text-green-700',
    yellow: 'bg-yellow-50 text-yellow-700',
    blue: 'bg-blue-50 text-blue-700',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <span className={`text-xs px-3 py-1 rounded-full ${colors[accent]}`}>
        {title}
      </span>
      <p className="mt-4 text-3xl font-bold">{value}</p>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, UserCheck } from 'lucide-react';

type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  budgetMin: number;
  budgetMax: number;
  service?: string;
};

type Props = {
  task: Task;
};

const statusConfig: any = {
  completed: {
    label: 'Completed',
    icon: CheckCircle,
    accent: 'from-emerald-400 to-emerald-600',
    pill: 'bg-emerald-100 text-emerald-700',
  },
  assigned: {
    label: 'Assigned',
    icon: UserCheck,
    accent: 'from-indigo-400 to-indigo-600',
    pill: 'bg-indigo-100 text-indigo-700',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    accent: 'from-amber-400 to-amber-600',
    pill: 'bg-amber-100 text-amber-700',
  },
};

export default function TaskCard({ task }: Props) {
  const navigate = useNavigate();
  const status = statusConfig[task.status];
  const Icon = status?.icon;
 console.log('Rendering TaskCard for task:', task);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/tasks/${task.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/tasks/${task.id}`)}
      className="group relative rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Accent bar */}
      <div
        className={`absolute top-0 left-0 h-1 w-full rounded-t-xl bg-gradient-to-r ${status?.accent}`}
      />

      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition">
          {task.title}
        </h3>

        <span
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${status?.pill}`}
        >
          {Icon && <Icon size={14} />}
          {status?.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-semibold text-gray-800">
          ₹{task.budgetMin.toLocaleString()} – ₹{task.budgetMax.toLocaleString()}
        </span>

        {task.service && (
          <span className="text-xs font-medium bg-gray-100 px-3 py-1 rounded-full">
            {task.service}
          </span>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTaskByIdApi } from '../api/task.api';
import { useTaskSocket } from '../hooks/useTaskSocket';
import {
  Clock,
  CheckCircle,
  IndianRupee,
  Activity,
} from 'lucide-react';

const statusStyles: any = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-100 text-amber-700',
    progress: 25,
  },
  assigned: {
    label: 'Assigned',
    color: 'bg-indigo-100 text-indigo-700',
    progress: 50,
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-700',
    progress: 75,
  },
  completed: {
    label: 'Completed',
    color: 'bg-emerald-100 text-emerald-700',
    progress: 100,
  },
};

export default function TaskDetails() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 LIVE SOCKET HOOK
  useTaskSocket(id, {
    onTaskUpdate: (updatedTask: any) => {
      setTask(updatedTask);
    },
    onActivity: (activity: any) => {
      setActivities((prev) => [activity, ...prev]);
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const data = await getTaskByIdApi(id);
        setTask(data);
      } catch {
        alert('Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <Skeleton />;

  if (!task) return <p className="p-6">Task not found</p>;

const status =
  statusStyles[task.status] ??
  {
    label: task.status || 'Unknown',
    color: 'bg-gray-100 text-gray-600',
    progress: 0,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium ${status.color}`}
            >
              {status.label}
            </span>
          </div>
          <p className="mt-3 text-gray-600">{task.description}</p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={18} />
            <h3 className="font-semibold">Progress</h3>
          </div>

          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-700"
              style={{ width: `${status.progress}%` }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {status.progress}% completed
          </p>
        </div>

        {/* Live Activity */}
        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} />
            <h3 className="font-semibold">Live Activity</h3>
          </div>

          {activities.length === 0 && (
            <p className="text-sm text-gray-500">No activity yet</p>
          )}

          <ul className="space-y-3">
            {activities.map((a, i) => (
              <li key={i} className="text-sm text-gray-700">
                • {a.message}
                <span className="text-xs text-gray-400 ml-2">
                  {new Date(a.time).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-6 sticky top-6 h-fit">
        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee size={18} />
            <h3 className="font-semibold">Budget</h3>
          </div>
          <p className="text-xl font-bold">
            ₹{task.budgetMin.toLocaleString()} – ₹
            {task.budgetMax.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <h3 className="font-semibold mb-2">Service</h3>
          <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
            {task.service || 'N/A'}
          </span>
        </div>

        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Message Contractor
        </button>
      </div>
    </div>
  );
}

/* 🔹 Skeleton Loader */
function Skeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto animate-pulse space-y-4">
      <div className="h-10 bg-gray-200 rounded w-1/2" />
      <div className="h-24 bg-gray-200 rounded" />
      <div className="h-16 bg-gray-200 rounded" />
    </div>
  );
}

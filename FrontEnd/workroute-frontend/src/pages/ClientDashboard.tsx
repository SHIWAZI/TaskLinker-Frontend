import { useEffect, useState } from 'react';
import { getClientTasksApi } from '../api/task.api';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ClientDashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getClientTasksApi();
      setTasks(data?.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  console.log('Client tasks:', tasks);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Create Task
          </button>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="text-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && tasks.length === 0 && (
        <p className="text-gray-500">No tasks created yet.</p>
      )}

      <div className="grid gap-4">
        {tasks?.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
      </div>

      {showCreate && (
        <CreateTaskModal
          onClose={() => setShowCreate(false)}
          onCreated={loadTasks}
        />
      )}
    </div>
  );
}

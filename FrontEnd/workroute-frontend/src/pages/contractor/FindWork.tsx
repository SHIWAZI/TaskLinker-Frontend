import { useEffect, useState } from 'react';
import { getOpenTasks, placeBid } from '../../api/task.api';

export default function FindWork() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getOpenTasks().then(setTasks);
  }, []);

  const bid = async (taskId: string) => {
    await placeBid(taskId, {
      amount: 50000,
      days: 10,
      proposal: 'I can deliver quality work',
    });
    alert('Bid placed');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Find Work</h1>

      {tasks.map((t) => (
        <div
          key={t.id}
          className="bg-white border rounded-xl p-5 mb-4"
        >
          <h3 className="font-semibold">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.description}</p>

          <button
            onClick={() => bid(t.id)}
            className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Place Bid
          </button>
        </div>
      ))}
    </div>
  );
}

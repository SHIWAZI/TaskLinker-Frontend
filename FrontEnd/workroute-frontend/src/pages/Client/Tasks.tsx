import { useNavigate } from 'react-router-dom';

export default function Tasks() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            onClick={() => navigate('/tasks/123')}
            className="bg-white border rounded-xl p-5 cursor-pointer hover:shadow"
          >
            <h3 className="font-semibold">Build Admin Dashboard</h3>
            <p className="text-sm text-gray-500">
              Status: Open
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

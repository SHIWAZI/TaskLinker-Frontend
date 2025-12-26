import { useState } from 'react';
import MapPicker from './MapPicker';
import { createTaskApi } from '../api/task.api';

export default function CreateTaskModal({ onClose, onCreated }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [service, setService] = useState('');
  const [budgetMin, setBudgetMin] = useState<number | ''>('');
  const [budgetMax, setBudgetMax] = useState<number | ''>('');
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!location) {
      alert('Please select a location on the map');
      return;
    }

    setLoading(true);
    try {
      await createTaskApi({
        title,
        description,
        service,
        budgetMin: Number(budgetMin),
        budgetMax: Number(budgetMax),
        location
      });
      onCreated();
      onClose();
    } catch {
      alert('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>

        {/* Title */}
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Describe the task"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Service */}
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Service (plumbing, electrician)"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />

        {/* Budget */}
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="Min budget"
            value={budgetMin}
            onChange={(e) => setBudgetMin(Number(e.target.value))}
          />
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="Max budget"
            value={budgetMax}
            onChange={(e) => setBudgetMax(Number(e.target.value))}
          />
        </div>

        {/* 📍 Map Section */}
        <div className="mb-3">
          <p className="font-medium mb-2">Select Location</p>
          <MapPicker onSelect={setLocation} />
        </div>

        {/* Address */}
        {location && (
          <input
            className="w-full border rounded px-3 py-2 bg-gray-100 mb-4"
            value={location.address}
            readOnly
          />
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            {loading ? 'Creating…' : 'Create Task'}
          </button>
        </div>
      </div>
    </div>
  );
}

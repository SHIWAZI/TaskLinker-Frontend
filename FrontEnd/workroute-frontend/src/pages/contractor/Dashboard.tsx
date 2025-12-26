import { useEffect, useState } from 'react';
import { getAssignedTasks } from '../../api/task.api';
import StatCard from './contractorUtils/StatCard';
import Section from './contractorUtils/Section';
import PageHeader from './contractorUtils/PageHeader';
import SkillBar from './contractorUtils/SkillBar';
import FeedbackCard from './contractorUtils/FeedbackCard';
 
type Task = {
  id: string;
  title?: string;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssignedTasks()
      .then((res: Task[]) => setTasks(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Welcome back 👋"
        subtitle="Here’s your dashboard overview"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Work"
          value={loading ? '—' : tasks.length}
        />
        <StatCard
          title="Total Earnings"
          value="₹82,500"
          accent="green"
        />
        <StatCard
          title="Client Rating"
          value="4.9"
          accent="yellow"
        />
        <StatCard
          title="Completed Jobs"
          value="18"
          accent="blue"
        />
      </div>

      {/* Skills */}
      <Section title="Your Skills">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SkillBar name="Plumbing" level={90} />
          <SkillBar name="Electrical" level={85} />
          <SkillBar name="Construction" level={75} />
          <SkillBar name="Carpentry" level={80} />
        </div>
      </Section>

      {/* Feedback */}
      <Section title="Client Feedback">
        <div className="space-y-4">
          <FeedbackCard
            name="Alex"
            comment="Very professional and timely delivery."
            rating={5}
          />
          <FeedbackCard
            name="Sara"
            comment="Excellent communication and quality work."
            rating={5}
          />
        </div>
      </Section>
    </div>
  );
}

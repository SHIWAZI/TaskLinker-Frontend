type SkillBarProps = {
  name: string;
  level: number; // 0 - 100
};

export default function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium">
        <span>{name}</span>
        <span>{level}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div
          className="bg-indigo-600 h-2 rounded-full"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

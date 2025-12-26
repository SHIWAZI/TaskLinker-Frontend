import type { Contractor } from './contractorTypes';
type Props = {
  contractor: Contractor;
};

export default function BasicInfo({ contractor }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6">
      <InfoItem label="Name" value={contractor.name} />
      <InfoItem label="Email" value={contractor.email} />
      <InfoItem label="Role" value="Contractor" />
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}

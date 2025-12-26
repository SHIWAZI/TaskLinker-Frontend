import { useEffect, useState } from 'react';
import type { Contractor, ContractorProfile } from './contractorUtils/contractorTypes';
import {
  getContractorProfile,
  updateContractorProfile,
  uploadPortfolio,
} from '../../api/Contractor.api';
import PageHeader from './contractorUtils/PageHeader';
import Section from './contractorUtils/Section';
import BasicInfo from './contractorUtils/BasicInfo';



export default function Profile() {
  const [contractor, setContractor] = useState<Contractor | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getContractorProfile().then(setContractor);
  }, []);

  const profile: ContractorProfile =
    contractor?.contractorProfile ?? {};

  const updateProfileField = (field: keyof ContractorProfile, value: string) => {
    if (!contractor) return;

    setContractor({
      ...contractor,
      contractorProfile: {
        ...profile,
        [field]: value,
      },
    });
  };

  const save = async () => {
    if (!contractor) return;

    setSaving(true);
    await updateContractorProfile(contractor.contractorProfile);
    setSaving(false);
    alert('Profile saved');
  };

  const addPortfolio = async () => {
    await uploadPortfolio({
      url: 'https://example.com/demo.png',
      type: 'image',
    });

    const updated = await getContractorProfile();
    setContractor(updated);
  };

  if (!contractor) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="space-y-10">
      <PageHeader
        title="Your Profile"
        subtitle="Manage your public contractor information"
      />

      {/* Basic Info */}
      <Section title="Basic Information">
        <BasicInfo contractor={contractor} />
      </Section>

      {/* Professional Info */}
      <Section title="Professional Details">
        <div className="space-y-4">
          <input
            value={profile.title || ''}
            onChange={(e) => updateProfileField('title', e.target.value)}
            className="border p-3 rounded-xl w-full"
            placeholder="Professional title (e.g. Full-Stack Developer)"
          />

          <textarea
            value={profile.bio || ''}
            onChange={(e) => updateProfileField('bio', e.target.value)}
            className="border p-3 rounded-xl w-full min-h-[120px]"
            placeholder="Write a short bio about yourself"
          />
        </div>
      </Section>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>

        <button
          onClick={addPortfolio}
          className="border px-6 py-2 rounded-xl hover:bg-gray-50 transition"
        >
          Add Portfolio Item
        </button>
      </div>
    </div>
  );
}

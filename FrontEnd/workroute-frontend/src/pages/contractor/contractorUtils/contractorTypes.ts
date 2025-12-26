export type ContractorProfile = {
  title?: string;
  bio?: string;
};

export type Contractor = {
  id: string;
  name: string;
  email: string;
  role: 'contractor';
  contractorProfile: ContractorProfile | null;
};

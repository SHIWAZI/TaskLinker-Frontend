import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

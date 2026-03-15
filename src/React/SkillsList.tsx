import React from 'react';

const skills = {
  'Languages': [
    'JavaScript',
    'TypeScript',
    'Python',
    'SQL',
    'Go'
  ],
  'Frontend': [
    'React.js',
    'Next.js',
    'Remix.js',
    'Tailwind CSS',
    'Astro'
  ],
  'Backend & Infra': [
    'Node.js',
    'Express.js',
    'Django',
    'GraphQL',
    'Docker',
    'AWS',
    'Nginx'
  ],
  'Data & AI': [
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'LLMOps',
    'VectorDB',
    'LiteLLM'
  ]
};

export default function SkillsList() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h4 className="text-lg font-semibold text-[var(--sec)] mb-2">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {items.map(skill => (
              <span
                key={skill}
                className="text-sm px-3 py-1 rounded-lg bg-[var(--white-icon-tr)] text-[var(--white-icon)] border border-[var(--white-icon-tr)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

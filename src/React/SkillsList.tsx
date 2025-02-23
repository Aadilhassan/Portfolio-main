import React from 'react';

// Consolidated and categorized skills
const skills = {
  'Core Expertise': [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Astro'
  ],
  'Cloud & DevOps': [
    'Amazon EC2',
    'Docker',
    'Vercel',
    'AWS'
  ],
  'Frameworks & Tools': [
    'TailwindCSS',
    'pnpm',
    'Git'
  ],
  'APIs & Integrations': [
    'RESTful APIs',
    'GraphQL',
    'API Development'
  ]
};

export default function SkillsList() {
  return (
    <div className="space-y-6">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category}>
          <h4 className="text-xl font-semibold text-[var(--white)]">{category}</h4>
          <ul className="list-disc pl-5 mt-2">
            {items.map(skill => (
              <li key={skill} className="text-[var(--white-icon)]">{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export const CompanyOwnership = [
    'Owned by Me',
    'Not Assigned',
    'N/A',
] as const;

export type CompanyOwnership = typeof CompanyOwnership[number];

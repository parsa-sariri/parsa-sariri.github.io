import { Award, Database, GitBranch, Binary } from 'lucide-react';

export const GITHUB_URL = 'https://github.com/parsa-sariri/kql-telemetry-threat-hunting';
export const CREDLY_PROFILE_URL = 'https://www.credly.com/users/parsa-sariri-ajili';
export const CREDLY_VERIFY_URL = 'https://www.credly.com/earner/earned/badge/04abb750-b432-4a55-a377-5cae4b54e33f';
export const CREDLY_BADGE_ID = '04abb750-b432-4a55-a377-5cae4b54e33f';
export const CREDLY_BADGE_IMAGE = 'https://images.credly.com/images/8aa171e5-784a-4a9e-b1ab-c3b818ea136a/image.png';

/* ── Additional verified credentials (rack / showcase badges) ──────────── */
export const CREDENTIALS = [
  {
    id: 'gold-star',
    badgeId: CREDLY_BADGE_ID,
    verifyUrl: CREDLY_VERIFY_URL,
    labelKey: 'goldStar',
    kind: 'credly',
  },
  {
    id: 'principal-detective',
    badgeId: '66019065-3136-4438-99a8-ba4141f1676f',
    verifyUrl: 'https://www.credly.com/earner/earned/badge/66019065-3136-4438-99a8-ba4141f1676f',
    labelKey: 'principalDetective',
    kind: 'credly',
  },
];

export const MS_APPLIED_SKILLS = {
  code: 'APL-5004',
  verifyId: 'EB4EF3E17238EF07',
  verifyUrl: 'https://learn.microsoft.com/en-us/users/parsa-sariri/credentials/EB4EF3E17238EF07',
};

/* ── Static, non-translated facts (dates, tool names, tags, slugs) ─────── */
export const CASES = [
  {
    id: 'kda-season2',
    featured: true,
    category: 'threat',
    date: '2026-08',
    difficulty: { en: 'Advanced', fa: 'پیشرفته' },
    tools: ['Azure Data Explorer', 'KQL', 'make-graph', 'scan operator'],
    tags: ['KQL', 'Azure Data Explorer (ADX)', 'Threat Hunting', 'Graph Analytics', 'scan operator', 'Credly Gold Star'],
    metrics: [
      { icon: Award, value: '11 / 11', metricKey: 'cases' },
      { icon: Database, value: '2.18M', metricKey: 'logs' },
      { icon: GitBranch, value: 'make-graph', metricKey: 'graph' },
      { icon: Binary, value: 'scan + bitset', metricKey: 'solver' },
    ],
    hasCredlyBadge: true,
    i18nKey: 'kda',
  },
  {
    id: 'hayabusa-triage',
    featured: false,
    category: 'dfir',
    date: '2026-09',
    difficulty: { en: 'Intermediate', fa: 'متوسط' },
    tools: ['Hayabusa v2.17', 'EvtxECmd', 'Timeline Explorer', 'PowerShell 7'],
    tags: ['Windows', 'EventLogs', 'Hayabusa', 'Forensics', 'Sigma', 'Timeline'],
    hasCredlyBadge: false,
    i18nKey: 'hayabusa',
  },
];

export const CATEGORY_ORDER = ['all', 'threat', 'dfir', 'infra', 'malware'];

export function getCaseBySlug(slug) {
  return CASES.find((c) => c.id === slug) || null;
}

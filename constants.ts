
import { Sector, Allocations } from './types';

export const SECTORS_ARRAY: Sector[] = [
  Sector.Education,
  Sector.Health,
  Sector.Infrastructure,
  Sector.Welfare,
  Sector.Defense,
];

export const SECTOR_DISPLAY_DETAILS: Record<Sector, { name: string; icon: string; colorClass: string; chartColor: string }> = {
  [Sector.Education]: { name: 'Education', icon: '📚', colorClass: 'bg-yellow-500', chartColor: '#F59E0B' }, // yellow-500
  [Sector.Health]: { name: 'Health', icon: '⚕️', colorClass: 'bg-sky-500', chartColor: '#0EA5E9' }, // sky-500
  [Sector.Infrastructure]: { name: 'Infrastructure', icon: '🏗️', colorClass: 'bg-orange-500', chartColor: '#F97316' }, // orange-500
  [Sector.Welfare]: { name: 'Welfare', icon: '🤝', colorClass: 'bg-green-500', chartColor: '#22C55E' }, // green-500
  [Sector.Defense]: { name: 'Defense', icon: '🛡️', colorClass: 'bg-slate-500', chartColor: '#64748B' }, // slate-500
};

export const INITIAL_ALLOCATIONS: Allocations = {
  [Sector.Education]: 20,
  [Sector.Health]: 20,
  [Sector.Infrastructure]: 20,
  [Sector.Welfare]: 20,
  [Sector.Defense]: 20,
};

export const TOTAL_BUDGET_POINTS = 100;
    
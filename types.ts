
export enum Sector {
  Education = 'EDUCATION',
  Health = 'HEALTH',
  Infrastructure = 'INFRASTRUCTURE',
  Welfare = 'WELFARE',
  Defense = 'DEFENSE',
}

export type Allocations = {
  [key in Sector]: number;
};

export interface SimulationResults {
  gdpGrowth: string;
  employmentRate: string;
  inflation: string;
  happinessScore: string;
}

export interface ChartDataItem {
  name: string;
  value: number;
  fill: string; // Hex color string for Recharts
}
    
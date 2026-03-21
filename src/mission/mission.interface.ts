export interface IMission {
  id: number;
  codename: string;
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
  targetName: string;
  riskLevel: string;
  startDate: string;
  endDate: string;
  durationDays: number;
}

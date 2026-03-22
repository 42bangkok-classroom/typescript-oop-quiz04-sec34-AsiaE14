export interface IMission {
  id: string;
  codename: string;
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
  targetName: string;
  riskLevel: string;
  startDate: string;
  endDate: string;
  durationDays: number;
}

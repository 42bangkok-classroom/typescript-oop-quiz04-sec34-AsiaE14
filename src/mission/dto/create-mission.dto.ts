export class CreateMissionDto {
  id: number;
  codename: string;
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
}

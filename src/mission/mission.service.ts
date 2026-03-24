import { Injectable } from '@nestjs/common';

@Injectable()
export class MissionService {
  create() {
    return 'This action adds a new mission';
  }
  private readonly missions = [
    { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
    { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
    { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
    { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
    { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
    { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' },
  ];

  getSummary() {
    return this.missions.reduce(
      (sum, a) => {
        if (sum[a.status] === undefined) {
          sum[a.status] = 1;
        } else {
          sum[a.status] = sum[a.status] + 1;
        }
        return sum;
      },
      {} as Record<string, number>,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} mission`;
  }

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}

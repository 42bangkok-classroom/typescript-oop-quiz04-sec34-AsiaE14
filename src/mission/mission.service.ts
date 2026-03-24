import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IMission } from './mission.interface';
import * as fs from 'fs';
@Injectable()
export class MissionService {
  create(body: any) {
    let dataJSON: IMission[];
    try {
      dataJSON = JSON.parse(
        fs.readFileSync('./data/missions.json', 'utf-8'),
      ) as IMission[];
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
      throw new InternalServerErrorException();
    }

    const count = String(Number(dataJSON[dataJSON.length - 1].id) + 1);
    const news = {
      id: count,
      ...body,
      status: 'ACTIVE',
      endDate: null,
    } as IMission;
    dataJSON.push(news);
    const addD = JSON.stringify(dataJSON, null, 2);
    fs.writeFileSync('./data/missions.json', addD, 'utf8');
    return news;
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
  geta() {
    let dataJSON: IMission[];
    try {
      dataJSON = JSON.parse(
        fs.readFileSync('./data/missions.json', 'utf-8'),
      ) as IMission[];
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
      throw new InternalServerErrorException();
    }
    const result = dataJSON.map((a) => {
      if (a.endDate === null) {
        a.durationDays = -1;
      } else {
        const date =
          (new Date(a.endDate).getTime() - new Date(a.startDate).getTime()) /
          (1000 * 60 * 60 * 24);
        a.durationDays = date;
      }
      return a;
    });
    return result;
  }

  findOne(id: string, rank: string = 'STANDARD') {
    let dataJSON: IMission[];
    try {
      dataJSON = JSON.parse(
        fs.readFileSync('./data/missions.json', 'utf-8'),
      ) as IMission[];
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
      throw new InternalServerErrorException();
    }
    const curr = dataJSON.find((a) => a.id === id);
    if (!curr) {
      throw new NotFoundException();
    }
    if (rank.toUpperCase() != 'TOP_SECRET') {
      if (curr.riskLevel == 'HIGH' || curr.riskLevel == 'CRITICAL') {
        return {
          id: curr.id,
          codename: curr.codename,
          status: curr.status,
          targetName: '***REDACTED***',
          riskLevel: curr.riskLevel,
        };
      }
    }
    return curr;
  }

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
//import dayjs from 'dayjs';
import { IMission } from './mission.interface';
import { clear } from 'console';

@Injectable()
export class MissionService {
  private readonly missions = [
    { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
    { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
    { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
    { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
    { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
    { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' },
  ];

  /* getSummary() {
 
     const summary = { };
    for(let a of this.missions){
     if ( summary[a.status]  ===undefined){
       summary[a.status] =1 
     }
     else{summary[a.status] =summary[a.status] + 1} 
 
    
   } return summary;
   }*/
  getSummary() {
    return this.missions.reduce(
      (summary, a) => {
        if (summary[a.status] === undefined) {
          summary[a.status] = 1;
        } else {
          summary[a.status] = summary[a.status] + 1;
        }

        return summary;
      },
      {} as Record<string, number>,
    );
  }

  findAll() {
    try {
      const data = JSON.parse(
        fs.readFileSync('./data/missions.json', 'utf8'),
      ) as IMission[];
      const result: IMission[] = data.map((time) => {
        if (time.endDate === null) {
          time.durationDays = -1;
        } else {
          //time.durationDays = dayjs(time.endDate).diff(dayjs(time.startDate),'day');
          const Dstart: Date = new Date(time.startDate);
          const Dend: Date = new Date(time.endDate);
          time.durationDays =
            (Dend.getTime() - Dstart.getTime()) / (1000 * 60 * 60 * 24);
        }
        return time;
      });

      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return [];
    }
  }

  Status(param: string) {
    try {
      const dataJSON = JSON.parse(
        fs.readFileSync('./data/missions.json', 'utf-8'),
      ) as IMission[];
      const acttive = dataJSON.filter((m) => m.status === param.toUpperCase());
      return acttive;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      return [];
    }
  }
  findOne(id: string, clearance: string = 'STANDARD') {
    let dataJSON: IMission[];
    try {
      dataJSON = JSON.parse(fs.readFileSync('./data/missions.json', 'utf-8'));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      throw new InternalServerErrorException();
    }

    const target = dataJSON.find((f) => f.id === id);
    if (!target) {
      throw new NotFoundException();
    }

    if (
      clearance.toUpperCase() !== 'TOP_SECRET' &&
      (target.riskLevel === 'HIGH' || target.riskLevel === 'CRITICAL')
    ) {
      target.targetName = '***REDACTED***';
    }
    return target;
  }

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}

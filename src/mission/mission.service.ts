import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
//import dayjs from 'dayjs';
import { IMission } from './mission.interface';

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

  findAll(){
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
      console.error(error);
      return [];
    }
  }

  Status(param){
    try{
      const dataJSON = JSON.parse(fs.readFileSync('./data/missions.json','utf-8'),) as IMission[]
      const acttive = dataJSON.filter((m)=> m.status === param.toUpperCase());
    return acttive;

    }catch(error){
      console.log(error);
      return ["a"];
    }
    
  }
  findOne(param:string){
    try{
    const dataJSON = JSON.parse(fs.readFileSync('./data/missions.json','utf-8'),) as IMission[]
   
    return dataJSON.find((f) => f.id === param); ;
  }catch(error){
    console.log(error);
    return[];
  }}

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}

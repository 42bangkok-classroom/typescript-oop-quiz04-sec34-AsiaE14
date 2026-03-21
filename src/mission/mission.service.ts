import { Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';




@Injectable()
export class MissionService {

  
  private readonly missions = [
  { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
  { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
  { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
  { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
  { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
  { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' }
];







  create(createMissionDto: CreateMissionDto) {
    return 'This action adds a new mission';
  }

 /* getSummary() {

    const summary = { };
   for(let a of this.missions){
    if ( summary[a.status]  ===undefined){
      summary[a.status] =1 
    }
    else{summary[a.status] =summary[a.status] + 1} 

   
  } return summary;
  }*/
 getSummary()
 { return this.missions.reduce((summary,a) =>{
  if(summary[a.status]===undefined){
    summary[a.status]=1;
  }else{ summary[a.status]= summary[a.status]+1}


  return summary;

 },{}); 
}

  findAll() {
    return `This action returns all mission`;
  }

  findOne(id: number) {
    return [
  { id: 1, codename: 'OPERATION_STORM', status: 'ACTIVE' },
  { id: 2, codename: 'SILENT_SNAKE', status: 'COMPLETED' },
  { id: 3, codename: 'RED_DAWN', status: 'FAILED' },
  { id: 4, codename: 'BLACKOUT', status: 'ACTIVE' },
  { id: 5, codename: 'ECHO_FALLS', status: 'COMPLETED' },
  { id: 6, codename: 'GHOST_RIDER', status: 'COMPLETED' }
];}

 

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}

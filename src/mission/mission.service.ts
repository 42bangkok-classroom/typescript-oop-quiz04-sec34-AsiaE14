import { Injectable } from '@nestjs/common';
import { CreateMissionDto } from './dto/create-mission.dto';
//import { UpdateMissionDto } from './dto/update-mission.dto';



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

  getSummary() {

    var count = 0;
    this.missions.reduce((acc, mission) => acc.concat(), []).filter(status => status === 'ACTIVE').length;
  
   // let json = JSON.stringify(ob);
  


     return count;
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

 /* update(id: number, updateMissionDto: UpdateMissionDto) {
    return `This action updates a #${id} mission`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} mission`;
  }
}

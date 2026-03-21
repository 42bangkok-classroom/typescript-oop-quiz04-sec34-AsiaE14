import { Controller, Get } from '@nestjs/common';
import { MissionService } from './mission.service';


@Controller('missions/summary')
export class MissionController {
    constructor(private readonly missionService:  MissionService) {}

    @Get()
    getSum(): Object {
    return this.missionService.getSummary();
  }

    

    
}

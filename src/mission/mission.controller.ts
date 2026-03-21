import { Controller, Get } from '@nestjs/common';
import { MissionService } from './mission.service';
import { IMission } from './mission.interface';

@Controller('missions/summary')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get()
  getSummary(): object {
    return this.missionService.getSummary();
  }
  @Get()
  async missions():Promise<IMission[]> {
    return this.missionService.findAll();
  }
  
}

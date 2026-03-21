import { Controller, Get } from '@nestjs/common';
import { MissionService } from './mission.service';
import { IMission } from './mission.interface';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get('summary')
  getSummary(): object {
    return this.missionService.getSummary();
  }
  @Get()
  missions(): IMission[] {
    return this.missionService.findAll();
  }
}

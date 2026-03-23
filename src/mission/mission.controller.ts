import { Controller, Get, Param, Query } from '@nestjs/common';
import { MissionService } from './mission.service';
import { IMission } from './mission.interface';
import { clear } from 'console';

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
  @Get('status/:status')
  Status(@Param('status') param: string) {
    return this.missionService.Status(param);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('clearance') clearance:string
  ) {
    return this.missionService.findOne(id,clearance);
  }
}

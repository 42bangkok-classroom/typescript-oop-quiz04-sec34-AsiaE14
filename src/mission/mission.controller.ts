import { Controller, Get, Param } from '@nestjs/common';
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
  @Get('status/:status')
  Status(@Param('status') param:string){
    return this.missionService.Status(param);
  }
 
  @Get(':id')
  findOne(@Param('id') param:string){
    return this.missionService.findOne(param);
  }
  
}

import { Controller, Get, Param, Delete } from '@nestjs/common';
import { MissionService } from './mission.service';

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  /*@Post()
  create(@Body() CreateMissionDto: string) {
    return this.missionService.create();
  }*/

  @Get('summary')
  getSummary() {
    return this.missionService.getSummary();
  }
  @Get()
  geta() {
    return this.missionService.geta();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.missionService.remove(+id);
  }
}

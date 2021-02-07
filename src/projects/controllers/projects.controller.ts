import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProjectsRepository } from '../repositories/projects.repository';
import { Project } from '../schemas/project.schema';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsRepository: ProjectsRepository) {}

  @Post()
  async createProject(
    @Request() req,
    @Body() project: Project,
  ): Promise<Project> {
    const userId = req.user.userId;
    project.user = userId;
    return this.projectsRepository.create(project);
  }

  @Get()
  async findAll(@Request() req): Promise<Project[]> {
    const userId = req.user.userId;
    return this.projectsRepository.findByUserId(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsRepository.findOne(+id);
  }

  // get projects

  // get project by id

  // update project by id

  // delete project by id
}

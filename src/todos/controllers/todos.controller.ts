import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Request,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProjectsRepository } from 'src/projects/repositories/projects.repository';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodosRepository } from '../repositories/todos.repository';
import { Todo } from '../schemas/todo.schema';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosRepository: TodosRepository,
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  @Post()
  async create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    const userId = req.user.userId;
    const projectId = createTodoDto.project;
    const project = await this.projectsRepository.findOne(projectId);
    const projectOwnerId = project.user;
    if (projectOwnerId != userId) {
      console.log('projectOwnerId !== userId');
      throw new UnauthorizedException();
    } else {
      return this.todosRepository.create(createTodoDto);
    }
  }

  @Get()
  findAll(@Request() req): Promise<Todo[]> {
    const userId = req.user.userId;
    return this.todosRepository.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosRepository.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosRepository.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosRepository.remove(id);
  }
}

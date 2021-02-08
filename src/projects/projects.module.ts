import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Todo, TodoSchema } from 'src/todos/schemas/todo.schema';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsRepository } from './repositories/projects.repository';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Todo.name, schema: TodoSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsRepository],
  exports: [ProjectsRepository],
})
export class ProjectsModule {}

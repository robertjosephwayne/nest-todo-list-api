import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from 'src/projects/projects.module';
import { Project, ProjectSchema } from 'src/projects/schemas/project.schema';
import { TodosController } from './controllers/todos.controller';
import { TodosRepository } from './repositories/todos.repository';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
    ProjectsModule,
  ],
  controllers: [TodosController],
  providers: [TodosRepository],
  exports: [TodosRepository],
})
export class TodosModule {}

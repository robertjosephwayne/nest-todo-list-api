import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from 'src/projects/projects.module';
import { TodosController } from './controllers/todos.controller';
import { TodosRepository } from './repositories/todos.repository';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    ProjectsModule,
  ],
  controllers: [TodosController],
  providers: [TodosRepository],
  exports: [TodosRepository],
})
export class TodosModule {}

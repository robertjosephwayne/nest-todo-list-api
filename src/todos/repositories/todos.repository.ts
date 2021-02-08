import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProjectsRepository } from 'src/projects/repositories/projects.repository';
import { ProjectDocument } from 'src/projects/schemas/project.schema';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo, TodoDocument } from '../schemas/todo.schema';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectModel('Todo')
    private todoModel: Model<TodoDocument>,
    @InjectModel('Project')
    private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = new this.todoModel({
      ...createTodoDto,
      createdAt: new Date().toISOString(),
      isComplete: false,
    });
    await newTodo.save();
    return newTodo.toObject({ versionKey: false });
  }

  async findByUserId(userId: string): Promise<TodoDocument[]> {
    return this.todoModel.find({ user: userId });
  }

  async findOne(id: string) {
    return this.todoModel.findById(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const foundProject = await this.projectModel.findById(
      updateTodoDto.project,
    );
    return this.todoModel.findOneAndUpdate(
      { _id: id },
      {
        ...updateTodoDto,
        project: foundProject,
      },
    );
  }

  remove(id: string) {
    return this.todoModel.deleteOne({ _id: id });
  }

  removeByProjectId(projectId: string) {
    return this.todoModel.deleteMany({ project: projectId });
  }
}

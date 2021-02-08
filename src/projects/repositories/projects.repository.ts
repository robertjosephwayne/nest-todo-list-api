import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import * as mongoose from 'mongoose';
import { TodoDocument } from 'src/todos/schemas/todo.schema';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel('Project')
    private projectModel: Model<ProjectDocument>,
    @InjectModel('Todo')
    private todoModel: Model<TodoDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = new this.projectModel(createProjectDto);
    await newProject.save();
    return newProject.toObject({ versionKey: false });
  }

  async findByUserId(userId): Promise<Project[]> {
    return this.projectModel.aggregate([
      { $match: { user: mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'todos',
          localField: '_id',
          foreignField: 'project',
          as: 'todoList',
        },
      },
    ]);
  }

  async findOne(id): Promise<Project> {
    return this.projectModel.findById(id);
  }

  async remove(id: string) {
    await this.todoModel.deleteMany({ project: id });
    return this.projectModel.deleteOne({ _id: id });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.updateOne({ _id: id }, updateProjectDto);
  }
}

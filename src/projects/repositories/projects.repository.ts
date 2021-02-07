import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel('Project')
    private projectModel: Model<ProjectDocument>,
  ) {}

  async create(project: Partial<Project>): Promise<Project> {
    const newProject = new this.projectModel(project);
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
    // return this.projectModel.find({ user: userId });
  }

  async findOne(id): Promise<Project> {
    return this.projectModel.findById(id);
  }
}

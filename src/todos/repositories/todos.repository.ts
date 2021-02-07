import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoDocument } from '../schemas/todo.schema';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectModel('Todo')
    private todoModel: Model<TodoDocument>,
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

  async findByUserId(userId: string) {
    return this.todoModel.find({ user: userId });
  }

  findAll() {
    // TODO
    return `This action returns all todos`;
  }

  findOne(id: number) {
    // TODO
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    // TODO
    return `This action updates a #${id} todo`;
  }

  remove(id: string) {
    return this.todoModel.deleteOne({ _id: id });
  }
}

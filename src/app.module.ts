import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProjectsController } from './projects/controllers/projects.controller';
import { ProjectsModule } from './projects/projects.module';
import { TodosModule } from './todos/todos.module';
import { TodosController } from './todos/controllers/todos.controller';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      port: process.env.MONGO_PORT,
    }),
    UsersModule,
    ProjectsModule,
    TodosModule,
  ],
  controllers: [AppController, ProjectsController, TodosController],
  providers: [AppService],
})
export class AppModule {}

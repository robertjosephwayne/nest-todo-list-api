import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { UsersRepository } from '../repositories/users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Public()
  @Get()
  getUsers(): any {
    // this.authService.signup();
    return this.usersRepository.findAll();
  }
}

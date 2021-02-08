import { User } from 'src/users/schemas/user.schema';

export class CreateProjectDto {
  name: string;
  user?: User;
}

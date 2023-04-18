import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IO_REDIS_KEY } from '@/redis.module';
import { Redis } from 'ioredis';
import { TodoDto } from '@todos';

@Injectable()
export class TodosService {
  constructor(@Inject(IO_REDIS_KEY) private readonly redisClient: Redis) {}

  async createTodo(todo: TodoDto): Promise<TodoDto> {
    const key = `todos:${todo.id}`;

    try {
      await this.redisClient
        .multi([['send_command', 'JSON.SET', key, '.', JSON.stringify(todo)]])
        .exec();
      return todo;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}

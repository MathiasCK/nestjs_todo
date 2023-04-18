import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IO_REDIS_KEY } from '@/redis.module';
import { Redis } from 'ioredis';
import { TodoDto } from '@todos';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(@Inject(IO_REDIS_KEY) private readonly redisClient: Redis) {}

  async getTodos(): Promise<TodoDto[]> {
    try {
      const keys = await this.redisClient.keys('*');

      if (!keys || keys.length === 0) {
        return [];
      }

      const todos: TodoDto[] = [];
      for (const key of keys) {
        try {
          const todo = await this.redisClient.send_command(
            'JSON.GET',
            key,
            '.',
          );
          todos.push(JSON.parse(todo));
        } catch (e) {
          this.logger.error(`Failed to get todo with key ${key}`);
          throw new NotFoundException(e.message);
        }
      }

      return todos;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getTodo(id: string): Promise<TodoDto> {
    const key = `todos:${id}`;

    this.logger.debug(`Attempting to get todo with id ${id}`);

    try {
      const todo = await this.redisClient.send_command('JSON.GET', key, '.');
      return JSON.parse(todo);
    } catch (e) {
      this.logger.error(`Failed to get todo ${key}`);
      throw new NotFoundException(e.message);
    }
  }

  async createTodo(todo: TodoDto): Promise<TodoDto> {
    const key = `todos:${todo.id}`;

    this.logger.debug(`Creating todo ${key}: ${JSON.stringify(todo)}`);

    try {
      await this.redisClient
        .multi([['send_command', 'JSON.SET', key, '.', JSON.stringify(todo)]])
        .exec();
      return todo;
    } catch (e) {
      this.logger.error(
        `Failed to add todo ${JSON.stringify(todo, null, 2)}\n${e}`,
      );
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAll(): Promise<void> {
    this.logger.debug(`Attempting delete all todos`);
    try {
      await this.redisClient.flushdb();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteTodo(id: string): Promise<void> {
    const key = `todos:${id}`;

    try {
      await this.redisClient.send_command('JSON.DEL', key, '.');
    } catch (e) {
      throw e;
    }
  }
}

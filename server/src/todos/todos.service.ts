import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IO_REDIS_KEY } from '@/redis.module';
import { Redis } from 'ioredis';
import { TodoDto } from '@todos';

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(@Inject(IO_REDIS_KEY) private readonly redisClient: Redis) {}

  async getTodos(): Promise<TodoDto[]> {
    const keys = await this.redisClient.keys('*');

    if (!keys || keys.length === 0) {
      return [];
    }

    const todos: TodoDto[] = [];
    for (const key of keys) {
      try {
        const todo = await this.redisClient.send_command('JSON.GET', key, '.');
        todos.push(JSON.parse(todo));
      } catch (e) {
        throw new Error(`Failed to get todo with key ${key}`);
      }
    }

    return todos;
  }

  async getTodo(id: string): Promise<TodoDto> {
    const key = `todos:${id}`;

    try {
      const todo = await this.redisClient.send_command('JSON.GET', key, '.');
      return JSON.parse(todo);
    } catch (e) {
      throw e;
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
    try {
      await this.redisClient.flushdb();
    } catch (e) {
      throw new InternalServerErrorException();
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

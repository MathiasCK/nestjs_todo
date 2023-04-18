import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from '@todos/todos.service';
import { TodoDto } from '@todos';

@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @HttpCode(200)
  @Get()
  async getTodos(): Promise<TodoDto[]> {
    return this.todosService.getTodos();
  }

  @HttpCode(200)
  @Get(':id')
  async getTodo(@Param('id') id): Promise<TodoDto> {
    return this.todosService.getTodo(id);
  }

  @HttpCode(201)
  @Post()
  async createTodo(@Body() todo: TodoDto): Promise<TodoDto> {
    return this.todosService.createTodo(todo);
  }

  @HttpCode(200)
  @Put(':id')
  async markTodo(@Param('id') id): Promise<TodoDto> {
    const todo = await this.getTodo(id);

    if (todo) {
      todo.isComplete = !todo.isComplete;
      return this.createTodo(todo);
    }
  }

  @Delete()
  async deleteAll() {
    return this.todosService.deleteAll();
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id): Promise<void> {
    return this.todosService.deleteTodo(id);
  }
}

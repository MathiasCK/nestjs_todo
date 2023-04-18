import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodosService } from '@todos/todos.service';
import { TodoDto } from './todo.dto';

@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getTodos(): Promise<TodoDto[]> {
    return this.todosService.getTodos();
  }

  @Get(':id')
  async getTodo(@Param('id') id): Promise<TodoDto> {
    return this.todosService.getTodo(id);
  }

  @Post()
  async createTodo(@Body() todo: TodoDto): Promise<TodoDto> {
    return this.todosService.createTodo(todo);
  }
}

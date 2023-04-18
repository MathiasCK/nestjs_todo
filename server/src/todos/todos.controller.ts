import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from '@todos/todos.service';
import { TodoDto } from './todo.dto';

@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getTodos() {
    return this.todosService.getTodos();
  }

  @Post()
  async createTodo(@Body() todo: TodoDto): Promise<TodoDto> {
    return this.todosService.createTodo(todo);
  }
}

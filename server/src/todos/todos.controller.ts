import { Body, Controller, Post } from '@nestjs/common';
import { TodosService } from '@todos/todos.service';
import { TodoDto } from './todo.dto';

@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async createTodo(@Body() todo: TodoDto): Promise<TodoDto> {
    return this.todosService.createTodo(todo);
  }
}

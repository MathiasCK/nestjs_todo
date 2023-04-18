import { Module } from '@nestjs/common';
import { TodosController } from '@todos';
import { TodosService } from '@todos/todos.service';

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

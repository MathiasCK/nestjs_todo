import { redisModule } from '@/modules.config';
import { Module } from '@nestjs/common';
import { TodosController } from '@todos';
import { TodosService } from '@todos/todos.service';

@Module({
  imports: [redisModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

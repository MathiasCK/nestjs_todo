import { Module } from '@nestjs/common';
import { TodosModule } from '@todos';

@Module({
  imports: [TodosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

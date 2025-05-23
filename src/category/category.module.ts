import { Module } from '@nestjs/common';
import { CategoryController } from './category.admin.controller';
import { CategoryService } from './category.service';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}

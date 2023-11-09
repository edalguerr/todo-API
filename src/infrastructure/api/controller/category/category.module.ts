import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryRepository } from 'src/infrastructure/repository/repository/category-repository';
import { CategoryServiceAdapter } from 'src/infrastructure/adapter/category-service';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryServiceAdapter, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}

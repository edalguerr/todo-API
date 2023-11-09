import { Injectable } from '@nestjs/common';
import { CategoryService as CategoryServiceApplication } from 'src/application/category-service/category-service';
import { CategoryServiceAdapter } from 'src/infrastructure/adapter/category-service';

@Injectable()
export class CategoryService {
  private applicationService: CategoryServiceApplication;

  constructor(adapterService: CategoryServiceAdapter) {
    this.applicationService = new CategoryServiceApplication(adapterService);
  }

  get app(): CategoryServiceApplication {
    return this.applicationService;
  }
}

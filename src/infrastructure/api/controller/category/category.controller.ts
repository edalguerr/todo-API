import {
  Controller,
  Get,
  Body,
  Post,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoryResponseDTO } from '../../dto/category/response/category-response';
import { CategoryService } from './category.service';
import { SaveCategoryRequestDTO } from '../../dto/category/request/save-category-request';
import { SaveCategoryDTOtoEntity } from '../../mapper/category/DTOtoEntity/save-category';
import { UpdateCategoryRequestDTO } from '../../dto/category/request/update-category.request';
import { DeleteCategoryRequestDTO } from '../../dto/category/request/delete-category-response';
import { ExceptionMessages } from 'src/shared/constants/exceptions';
import { Task } from 'src/domain/entity/task';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  list(): Promise<CategoryResponseDTO[]> {
    return this.categoryService.app.list();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<CategoryResponseDTO> {
    if (isNaN(id)) {
      throw new HttpException(
        ExceptionMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.categoryService.app.getCategoryById(id);
  }

  @Get(':id/task')
  findTaskByCategoryId(@Param('id') id: number): Promise<Task[]> {
    if (isNaN(id)) {
      throw new HttpException(
        ExceptionMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.categoryService.app.getTasks(id);
  }

  @Post()
  save(@Body() category: SaveCategoryRequestDTO): Promise<CategoryResponseDTO> {
    return this.categoryService.app.save(new SaveCategoryDTOtoEntity(category));
  }

  @Put()
  update(
    @Body() category: UpdateCategoryRequestDTO,
  ): Promise<CategoryResponseDTO> {
    return this.categoryService.app.update(category);
  }

  @Delete()
  delete(
    @Body() category: DeleteCategoryRequestDTO,
  ): Promise<CategoryResponseDTO> {
    return this.categoryService.app.delete(category.id);
  }
}

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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTaskResponseDTO } from '../../dto/task/response/update-task-response';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'Get all categories',
    description: 'Return a category list',
  })
  @ApiResponse({
    status: 200,
    description: 'Category list',
    type: [CategoryResponseDTO],
  })
  @Get()
  list(): Promise<CategoryResponseDTO[]> {
    return this.categoryService.app.list();
  }

  @ApiOperation({
    summary: 'Get category by id',
    description: 'Get category by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a category',
    type: CategoryResponseDTO,
  })
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

  @ApiOperation({
    summary: 'Get tasks by categoryId',
    description: 'Get tasks by categoryId',
  })
  @ApiResponse({
    status: 200,
    description: 'Task list',
    type: [UpdateTaskResponseDTO],
  })
  @Get(':id/task')
  findTaskByCategoryId(
    @Param('id') id: number,
  ): Promise<UpdateTaskResponseDTO[]> {
    if (isNaN(id)) {
      throw new HttpException(
        ExceptionMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.categoryService.app.getTasks(id);
  }

  @ApiOperation({
    summary: 'Save category',
    description: 'Save category',
  })
  @ApiResponse({
    status: 200,
    description: 'Category saved',
    type: CategoryResponseDTO,
  })
  @Post()
  save(@Body() category: SaveCategoryRequestDTO): Promise<CategoryResponseDTO> {
    return this.categoryService.app.save(new SaveCategoryDTOtoEntity(category));
  }

  @ApiOperation({
    summary: 'Update category',
    description: 'Update category',
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated',
    type: CategoryResponseDTO,
  })
  @Put()
  update(
    @Body() category: UpdateCategoryRequestDTO,
  ): Promise<CategoryResponseDTO> {
    return this.categoryService.app.update(category);
  }

  @ApiOperation({
    summary: 'Delete category',
    description: 'Delete category',
  })
  @ApiResponse({
    status: 200,
    description: 'Category deleted',
    type: CategoryResponseDTO,
  })
  @Delete()
  delete(
    @Body() category: DeleteCategoryRequestDTO,
  ): Promise<CategoryResponseDTO> {
    return this.categoryService.app.delete(category.id);
  }
}

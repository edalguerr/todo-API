import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Redirect('https://docs.nestjs.com', 302)
  getHello() {
    return this.appService.listTasks();
  }

  @Get('search/:id')
  // @HttpCode(200)
  searchHello(@Param('id', ParseIntPipe) id: number): string {
    return `Hello with id: ${id} from ${process.env.NODE_ENV}`;
  }

  @Get('product')
  searchByCategory(@Query('category') category: string): string {
    return `Hello with category: ${category}`;
  }

  @Get('product/:id')
  notFoundItem(@Param('id') idItem: number = 0): void {
    throw new HttpException(
      `Item with  id ${idItem} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}

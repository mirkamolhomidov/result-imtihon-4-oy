import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/common/guards/roles.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

@UseGuards(RoleGuard('admin'))
@Controller('admin/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
  async createCategoryController(@Body() createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryService.createCategory(createCategoryDto);
    return { success: true, message: 'Category created successfully', data };
  }
  @Delete('/:id')
  async deleteCategoryController(@Param('id') id: string) {
    await this.categoryService.deleteCategory(id);
    return { success: true, message: 'Category deleted successfully' };
  }
}

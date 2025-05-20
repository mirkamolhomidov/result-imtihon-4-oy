import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';

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

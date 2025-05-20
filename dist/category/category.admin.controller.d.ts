import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createCategoryController(createCategoryDto: CreateCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            description: string;
            slug: string;
        };
    }>;
    deleteCategoryController(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

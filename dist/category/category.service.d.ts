import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/category.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    createCategory({ name, description }: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        description: string;
        slug: string;
    }>;
    deleteCategory(id: string): Promise<{
        success: boolean;
    }>;
}

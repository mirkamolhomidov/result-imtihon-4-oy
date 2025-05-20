import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { FavoritesModule } from './favorites/favorites.module';
import { MovieModel } from './movies/movie.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { ReviewModule } from './review/review.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    ProfileModule,
    SubscriptionModule,
    CategoryModule,
    MovieModel,
    FavoritesModule,
    ReviewModule,
  ],
})
export class AppModule {}

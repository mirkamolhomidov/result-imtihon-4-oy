import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { MovieModel } from './movies/movie.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
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
  ],
})
export class AppModule {}
// 1335865d-6825-41fd-839d-3356b75b619b
// be29a6da-c2b4-4b34-88d4-319e21a3eca2

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LostModule } from './lost/lost.module';
import { FoundModule } from './found/found.module';
import { ClaimsModule } from './claims/claims.module';
import { AdminModule } from './admin/admin.module';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [
    // Config module globally
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM PostgreSQL configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // dev only
      }),
    }),

    // Application modules
    AuthModule,
    UsersModule,
    LostModule,
    FoundModule,
    ClaimsModule,
    AdminModule,
    CommentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*');
  }
}

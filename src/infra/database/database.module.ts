import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvironmentConfigModule } from '../config/env/environment-config.module';
import { EnvironmentConfigService } from '../config/env/environment-config.validation';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (configService: EnvironmentConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

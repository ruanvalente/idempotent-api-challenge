import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvironmentConfigModule } from '../config/env/environment-config.module';
import { EnvironmentConfigService } from '../config/env/environment-config.validation';
import { Order } from 'src/modules/orders/entities/order.entity';

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
        entities: [Order],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Order]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

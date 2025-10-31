import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Environment, validate } from './environment-config.service';
import { env, EnvironmentConfigService } from './environment-config.validation';

const NODE_ENV = env<Environment>('NODE_ENV', Environment.DEVELOPMENT);

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${NODE_ENV}`,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}

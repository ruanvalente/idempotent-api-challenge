import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;
  @IsNumber()
  DB_PORT: number;
  @IsString()
  DB_USERNAME: string;
  @IsString()
  DB_PASSWORD: string;
  @IsString()
  DB_DATABASE: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    console.error('Failed to validate required enviroment variables');
    console.error(errors.toString());
    throw new Error(errors.toString());
  }
  console.log('All required environment variables were validated.');
  return validatedConfig;
}

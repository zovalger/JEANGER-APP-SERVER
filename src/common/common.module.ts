import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ErrorHandleProvider } from './providers';

@Module({
  imports: [ConfigModule],
  providers: [ErrorHandleProvider],
  exports: [ErrorHandleProvider],
})
export class CommonModule {}

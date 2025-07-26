import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForeignExchangeModule } from 'src/foreign-exchange/foreign-exchange.module';
import { AuthModule } from 'src/user-features/auth/auth.module';
import { ProductController, ProductReferenceController } from './controllers';
import { ProductModel, ProductReferenceModel } from './models';
import { ProductReferenceService, ProductService } from './services';

@Module({
  imports: [
    AuthModule,
    ForeignExchangeModule,
    MongooseModule.forFeatureAsync([ProductModel, ProductReferenceModel]),
  ],
  controllers: [ProductController, ProductReferenceController],
  providers: [ProductService, ProductReferenceService],
  exports: [ProductService, ProductReferenceService],
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/user-features/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel } from './models/product.model';
import { ProductReferenceService } from './services/product-reference.service';
import { ForeignExchangeModule } from 'src/foreign-exchange/foreign-exchange.module';

@Module({
  imports: [
    AuthModule,
    ForeignExchangeModule,
    MongooseModule.forFeatureAsync([ProductModel]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductReferenceService],
})
export class ProductModule {}

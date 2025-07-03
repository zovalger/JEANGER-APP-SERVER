import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserFeaturesModule } from './user-features/user-features.module';
import { EnvConfiguration } from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { JoiValidationsSchema } from './config/joi.validation';
import { CommonModule } from './common/common.module';
import { ProductFeaturesModule } from './product-features/product-features.module';
import { ForeignExchangeModule } from './foreign-exchange/foreign-exchange.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ['.env.test.local'],
      load: [EnvConfiguration],
      validationSchema: JoiValidationsSchema,
    }),

    CommonModule,

    MongooseModule.forRoot(EnvConfiguration().mongodb_uri),
    UserFeaturesModule,
    ProductFeaturesModule,
    ForeignExchangeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

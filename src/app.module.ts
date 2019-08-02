import { Module } from '@nestjs/common';
import  { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb+srv://mirceanotadmin:qXIed5J0EXj0bcvF@myfirstcluster-hqjfp.mongodb.net/nestjs-demo?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

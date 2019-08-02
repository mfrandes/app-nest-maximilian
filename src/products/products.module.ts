import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsControler } from "./products.controler";
import { ProductsService } from "./products.service";
import { ProductSchema } from "./product.model";

@Module({
    imports:[MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
    controllers: [ ProductsControler],
    providers: [ProductsService]
})

export class ProductsModule {}
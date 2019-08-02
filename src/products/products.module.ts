import { Module } from "@nestjs/common";
import { ProductsControler } from "./products.controler";
import { ProductsService } from "./products.service";

@Module({
    controllers: [ ProductsControler],
    providers: [ProductsService]
})

export class ProductsModule {}
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose"

import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ title: title, description: desc, price: price });
        this.products.push(newProduct);
        const result = await newProduct.save();
        console.log(result)
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        //console.log(result);

        //return this.products.slice(); // e la fel cu:
        //return [...this.products]; 
        return products.map(product => ({ id: product.id, title: product.title, description: product.description, price: product.price }));
    }
    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
            id: product.id, 
            title: product.title,
            description: product.description,
            price: product.price
        };
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        /*const product = this.findProduct(productId)[0];
          const index = this.findProduct(productId)[1]; is the same as new sintax array destructuring: */
        const updatedProduct = await this.findProduct(productId);
        
         if(title) {
             updatedProduct.title = title;
         }
         if(desc){
             updatedProduct.description = desc;
         }
         if(price){
             updatedProduct.price = price;
         }
         updatedProduct.save();
    }
    async deleteProduct(prodId: string) {
       const result = await this.productModel.deleteOne({_id: prodId}).exec()
       console.log(result);
       if(result.n ===0){
           throw new NotFoundException('Could not find Product')
       }
    }


    /*private findProduct(id): [Product, number]{
        const productIndex = this.products.findIndex((prod)=>prod.id == id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find product')
        };
        return [product, productIndex];
    }*/
    private async findProduct(id: string): Promise<Product> {
        let product
        try {
            product = await this.productModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find product')
        }
        return product;
    }
}    
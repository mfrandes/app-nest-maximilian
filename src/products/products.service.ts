import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose"; 
import { Model } from "mongoose"

import { Product } from "./product.model";

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}
    
    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({title: title, description: desc, price:price});
        this.products.push(newProduct);
        const result = await newProduct.save();
        console.log(result)
        return result.id as string;
    }
    
    async getProducts(){
        const products = await this.productModel.find().exec();
        //console.log(result);
        
        //return this.products.slice(); // e la fel cu:
        //return [...this.products]; 
        return products.map( product => ({id: product.id, title: product.title, description: product.description, price: product.price }));
    }
    getSingleProduct(productId: string){
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(productId: string, title: string, desc: string, price: number){
      /*const product = this.findProduct(productId)[0];
        const index = this.findProduct(productId)[1]; is the same as new sintax array destructuring: */
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title) {
            updatedProduct.title = title;
        }
        if(desc){
            updatedProduct.description = desc;
        }
        if(price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }
    deleteProduct(id){
        const [_, index] = this.findProduct(id);
        this.products.splice(index, 1);
    }

    private findProduct(id): [Product, number]{
        const productIndex = this.products.findIndex((prod)=>prod.id == id);
        const product = this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find product')
        };
        return [product, productIndex];
    }
}    
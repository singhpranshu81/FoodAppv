import { Cart } from "./Cart";
import { Category } from "./Category";

    export interface Food {
        foodId: number;
        foodName: string;
        quantity: number;
        price: number;
        description:string;
        url:string
        category: Category;
        cart: Cart;
        
    }
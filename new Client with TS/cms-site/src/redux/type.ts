type History = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    productId: number;
    userId: number;
    orderType: number;
    tableId: number;
  };
  
  export type typeDataHistory = {
    data: History[]
  }

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  image: string;
  categoryId: number
}
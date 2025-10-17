export interface Product {
  _id?: string;
  sku: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  isActive: boolean;
  category: string;
  imageUrl?: string;
  createdAt?: string;
}

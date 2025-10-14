// src/types/Product.ts

export interface Product {
  sku: string;         // Unique product identifier (SKU)
  brand: string;   
  quantity: number;    // Inventory quantity (must be a number) 
  price: number;       // Price (must be a number) 
  isActive: boolean;   // Status (active/inactive) 
  category: string;    
  imageUrl: string;    
  createdAt: Date;     
}
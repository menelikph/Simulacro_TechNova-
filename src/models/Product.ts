// src/models/Product.ts
import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { Product as ProductInterface } from '../types/Product'; // Import the TypeScript interface

// Extend the interface with Mongoose's Document type
export interface ProductDocument extends ProductInterface, Document {}

const ProductSchema: Schema = new Schema({
  sku: { type: String, required: true, unique: true }, // SKU must be unique 
  name: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 }, // Minimal validation (non-negative)
  price: { type: Number, required: true, min: 0.01 },
  isActive: { type: Boolean, default: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  _id: { type: Types.ObjectId, auto: true }, // Explicitly define the Mongoose ID type (solves 'unknown' issue)
});

// Use Model<ProductDocument> to explicitly tell TypeScript the type of the exported Model
const ProductModel = (mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema)) as Model<ProductDocument>; // model is already compiled

export default ProductModel; 
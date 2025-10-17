import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  sku: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  isActive: boolean;
  category: string;
  imageUrl: string;
  createdAt: Date;
} 


const ProductSchema: Schema = new Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;

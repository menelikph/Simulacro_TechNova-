/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'; // USE THESE TYPES
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';
import { Product } from '@/types/Product';

// DB connection outside of handlers
await dbConnect();

// ===================================
// 1. GET: List products and allow filtering
// ===================================
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url); // get search params
        const category = searchParams.get('category');
        const brand = searchParams.get('brand');

        const filter: any = {};
        if (category) filter.category = category;
        if (brand) filter.brand = brand;
        
        const products = await ProductModel.find(filter).sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (error) {
        // Error handling
        console.error('Error fetching products:', error);
        return NextResponse.json({ success: false, error: 'Error fetching products' }, { status: 400 });
    }
}

// ===================================
// 2. POST: Create a new product
// ===================================
export async function POST(request: NextRequest) {
    try {
        const productData: Product = await request.json(); // Get the body as JSON

        // 1. SKU Uniqueness Validation (Requirement 3.1, 3.6)
        const existingProduct = await ProductModel.findOne({ sku: productData.sku });
        if (existingProduct) {
          return NextResponse.json({ success: false, error: 'SKU must be unique to prevent duplication.' }, { status: 400 });
        }

        // 2. Create product
        const product = await ProductModel.create(productData);

        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error) {
        // General error handling
        return NextResponse.json(
            { success: false, error: (error as Error).message || 'Failed to create product due to invalid data.' }, 
            { status: 400 }
        );
    }
}
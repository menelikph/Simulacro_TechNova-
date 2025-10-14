/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';
import { Product as ProductInterface } from '@/types/Product'; // Assuming the interface is in '@/types/Product'

// Type for the second argument of route functions
interface RouteContext {
    params: {
        id: string;
    };
}

/**
 * Utility function to handle update logic (used by PUT and PATCH).
 */
async function handleUpdate(request: NextRequest, productId: string) {
    await dbConnect();
    
    // 1. Get request body - MUST BE AWAITED
    // IMPORTANT: Ensure the request body is awaited *after* dbConnect
    const productData: Partial<ProductInterface> & { sku?: string, name?: string } = await request.json(); 

    if (!productId) {
        return NextResponse.json({ success: false, error: 'Product ID is required in URL' }, { status: 400 });
    }

    try {
        // 2. SKU Uniqueness Check (Crucial for business rules - Requirement 3.1)
        if (productData.sku) {
            const existingProduct = await ProductModel.findOne({ sku: productData.sku });
            
            // Check if product exists and if its ID is NOT the current product's ID
            if (existingProduct && existingProduct._id?.toString() !== productId) {
                return NextResponse.json({ success: false, error: 'SKU must be unique to prevent duplication.' }, { status: 400 });
            }
        }

        // 3. Update product
        const updatedProduct = await ProductModel.findByIdAndUpdate(
          productId,
          productData,
          { new: true, runValidators: true } // new: returns the updated doc; runValidators: applies schema rules
        );

        if (!updatedProduct) {
          return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedProduct }, { status: 200 });
    } catch (error) {
        // General error handling (Requirement 3.6, 4.5)
        return NextResponse.json(
            { success: false, error: (error as Error).message || 'Failed to update product due to invalid data.' },
            { status: 400 }
        );
    }
}

// ===================================
// 1. PATCH: Update existing product (partial update)
// ===================================
export async function PATCH(request: NextRequest, context: RouteContext) {
    // FIX: Accessing via the context object directly bypasses the Next.js synchronous read check.
    const productId = context.params.id;
    return handleUpdate(request, productId);
}

// ===================================
// 2. PUT: Update existing product (full replacement - uses same logic as PATCH for simplicity)
// ===================================
export async function PUT(request: NextRequest, context: RouteContext) {
    const productId = context.params.id;
    return handleUpdate(request, productId);
}

// ===================================
// 3. DELETE: Remove a product
// ===================================
export async function DELETE(request: NextRequest, context: RouteContext) {
    await dbConnect();

    const productId = context.params.id; // Accessing via context object

    if (!productId) {
        return NextResponse.json({ success: false, error: 'Product ID is required in URL' }, { status: 400 });
    }

    try {
        // Use deleteOne to handle Mongoose logic with the ID
        const result = await ProductModel.deleteOne({ _id: productId });

        if (result.deletedCount === 0) {
          return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }

        return new NextResponse(null, { status: 204 }); // 204 No Content for successful deletion
        
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to delete product' }, 
            { status: 400 }
        );
    }
}

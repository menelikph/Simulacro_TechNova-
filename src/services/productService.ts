// src/services/productService.ts
import axios from 'axios';
import { Product } from '../types/Product'; 

const API_URL = '/api/products'; 

/**
 * Fetch all products from the API (GET).
 */
export const getProducts = async (filters?: { category?: string, brand?: string }): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to retrieve product list.'); 
  }
};

/**
 * Create a new product (POST).
 */
export const createProduct = async (newProduct: Product): Promise<Product> => {
  try {
    const response = await axios.post(API_URL, newProduct);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.error || 'Failed to create product.';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred during product creation.');
  }
};

/**
 * Update an existing product (PATCH).
 */
export const updateProduct = async (productId: string, updatedFields: Partial<Product>): Promise<Product> => {
  try {
    const response = await axios.patch(`${API_URL}/${productId}`, updatedFields);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.error || 'Failed to update product.';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred during product update.');
  }
};

/**
 * Delete a product (DELETE).
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${productId}`);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.error || 'Failed to delete product.';
      throw new Error(errorMessage);
    }
    throw new Error('An unexpected error occurred during product deletion.');
  }
};
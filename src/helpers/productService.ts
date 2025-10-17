/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = "/api/products"; // Next.js API route

// Get all products
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get product by ID
export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new product
export const createProduct = async (productData: any) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

// Update a product
export const updateProduct = async (id: string, productData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

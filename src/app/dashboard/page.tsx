/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {createProduct,getProducts,updateProduct,deleteProduct} from "@/helpers/productService";

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);


  // 🟢 Cargar los productos
  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  

  // 🟡 Crear o editar producto
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const productData = {
      sku: formData.get("sku"),
      name: formData.get("name"),
      brand: formData.get("brand"),
      category: formData.get("category"),
      quantity: Number(formData.get("quantity")),
      price: Number(formData.get("price")),
      imageUrl: formData.get("imageUrl"),
      isActive: true,
    };

    if (selectedProduct) {
      await updateProduct(selectedProduct._id, productData);
    } else {
      await createProduct(productData);
    }

    await fetchProducts();
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // 🔴 Eliminar producto
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      await fetchProducts();
    }
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">🛍️ Products</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

     {/* 🧾 Tabla de productos */}
<div className="bg-white rounded-lg shadow-md overflow-hidden">
  <table className="w-full text-sm text-left">
    <thead className="bg-gray-200">
      <tr>
        <th className="px-4 py-2 text-center">Image</th>
        <th className="px-4 py-2">SKU</th>
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Brand</th>
        <th className="px-4 py-2">Category</th>
        <th className="px-4 py-2 text-center">Stock</th>
        <th className="px-4 py-2 text-center">Price</th>
        <th className="px-4 py-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.length > 0 ? (
        products.map((p) => (
          <tr key={p._id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2 text-center">
              <img
                src={p.imageUrl || "https://via.placeholder.com/60"}
                alt={p.name}
                className="w-14 h-14 object-cover rounded-md mx-auto border"
              />
            </td>
            <td className="px-4 py-2">{p.sku}</td>
            <td className="px-4 py-2">{p.name}</td>
            <td className="px-4 py-2">{p.brand}</td>
            <td className="px-4 py-2">{p.category}</td>
            <td className="px-4 py-2 text-center">{p.quantity}</td>
            <td className="px-4 py-2 text-center">${p.price}</td>
            <td className="px-4 py-2 text-center space-x-2">
              <button
                onClick={() => {
                  setSelectedProduct(p);
                  setIsModalOpen(true);
                }}
                className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={8}
            className="text-center py-4 text-gray-500 italic"
          >
            No products found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* 🟢 Modal para crear/editar */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {selectedProduct ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">SKU</label>
                <input
                  name="sku"
                  defaultValue={selectedProduct?.sku || ""}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  name="name"
                  defaultValue={selectedProduct?.name || ""}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Brand</label>
                <input
                  name="brand"
                  defaultValue={selectedProduct?.brand || ""}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                  name="category"
                  defaultValue={selectedProduct?.category || ""}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  name="quantity"
                  type="number"
                  defaultValue={selectedProduct?.quantity || ""}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Price ($)</label>
                <input
                  name="price"
                  type="number"
                  defaultValue={selectedProduct?.price || ""}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  name="imageUrl"
                  defaultValue={selectedProduct?.imageUrl || ""}
                  className="border rounded w-full p-2"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                  }}
                  className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  {selectedProduct ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

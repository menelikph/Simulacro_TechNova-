/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/ProductDashboard.tsx
'use client'; 

import React, { useState, useEffect } from 'react'; 
import { getProducts, updateProduct, deleteProduct } from '../services/productService';
import ProductCard, { ProductItem } from './ProducCard'; 
import Button from './ui/Button';
import { useAuth } from '../context/AuthContext'; 

// Simple message type
interface StatusMessage {
    text: string;
    type: 'success' | 'error' | 'info';
}

const ProductDashboard: React.FC = () => {
  const { user, isAdmin, logout } = useAuth(); 
  const [productList, setProductList] = useState<ProductItem[]>([]); // Simpler state name
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState<StatusMessage | null>(null); // Simpler state name

  // Function to load data (Requirement 3.4)
  async function loadProducts() {
    setIsLoading(true);
    try {
      const data = await getProducts();
      // Simple cast to include _id
      setProductList(data as ProductItem[]);
      setCurrentMessage(null);
    } catch (error) {
      // Simple error catch (Requirement 3.6, 4.5)
      const msg = (error as Error).message || 'Oh no, couldn\'t load the products!';
      setCurrentMessage({ text: msg, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }
  
  // Simple useEffect for loading on mount
  useEffect(() => {
    loadProducts();
  }, [/* Empty dependency array for first load */]); 

  // Handler for changing Active/Inactive status (PATCH - Requirement 3.4)
  const handleToggleProductStatus = async (productId: string, currentStatus: boolean) => {
    if (!isAdmin) return; 

    try {
      await updateProduct(productId, { isActive: !currentStatus });
      
      // Update list using map
      setProductList(prevList => prevList.map(item => 
        item._id === productId ? { ...item, isActive: !currentStatus } : item
      ));

      setCurrentMessage({ text: 'Product status changed!', type: 'success' });
    } catch (error) {
      setCurrentMessage({ text: 'Error toggling status!', type: 'error' });
    }
  };

  // Handler for deletion (DELETE - Requirement 3.4)
  const handleRemoveProduct = async (productId: string) => {
    if (!isAdmin) return;
    
    // Simple confirmation dialog
    if (!window.confirm("Are you really sure you want to delete this product?")) return;

    try {
        await deleteProduct(productId);
        
        // Update list using filter
        setProductList(prevList => prevList.filter(item => item._id !== productId));
        
        setCurrentMessage({ text: 'Product removed successfully!', type: 'success' });
    } catch (error) {
        setCurrentMessage({ text: 'Error deleting product!', type: 'error' });
    }
  };

  // Placeholder for Edit (Requirement 3.1)
  const handleEditItem = (item: ProductItem) => {
    if (!isAdmin) return;
    setCurrentMessage({ text: `Pretending to edit: ${item.name}`, type: 'info' }); 
  };
  

  if (isLoading) {
    return <div className="text-center p-10 text-xl font-medium">Please wait, loading data...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">
          The Product Catalog 🚀 ({productList.length} items)
        </h1>
        
        <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
                Hi, {user?.username} ({user?.role})
            </span>
            {/* Conditional Button for Admin (Requirement 4.2) */}
            {isAdmin && (
                <Button variant="primary" onClick={() => setCurrentMessage({text: 'Form goes here!', type: 'info'})}>
                  + Add New
                </Button>
            )}
            <Button variant="secondary" onClick={logout}>
              Sign Out
            </Button>
        </div>
      </div>

      {/* Display Messages (Requirement 3.6, 4.5) */}
      {currentMessage && (
        <div className={`p-3 rounded-md mb-4 font-medium ${currentMessage.type === 'success' ? 'bg-green-100 text-green-700' : currentMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
          {currentMessage.text}
        </div>
      )}

      {/* Product Grid (Requirement 3.3, 4.3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productList.map((item) => (
          <ProductCard 
            key={item._id} 
            item={item} 
            onEditClick={handleEditItem} 
            onToggle={handleToggleProductStatus}
            onRemove={handleRemoveProduct}
            isUserAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDashboard;
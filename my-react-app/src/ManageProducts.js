import React, { useState, useEffect } from 'react';
import AddProductForm from './AddProductForm';

function ManageProducts() {
  const [products, setProducts] = useState([]);

  // Function to fetch products from backend API
  const fetchProducts = () => {
    fetch('/api/admin/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };

  // Initial fetch of products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to add a new product
  const addProduct = (newProduct) => {
    fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]); // Add newly added product to state
      })
      .catch(error => console.error('Error adding product:', error));
  };

  // Function to delete a product
  const deleteProduct = (productId) => {
    fetch(`/api/admin/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        setProducts(products.filter(product => product.ProductID !== productId)); // Remove deleted product from state
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <AddProductForm onAddProduct={addProduct} /> {/* AddProductForm component for adding new products */}
      <hr />
      <h3>Product List</h3>
      <ul>
        {products.map(product => (
          <li key={product.ProductID}>
            <p>{product.Name}</p>
            <p>{product.Description}</p>
            <p>Price: ${product.Price}</p>
            {product.ImageURL && <img src={product.ImageURL} alt={product.Name} style={{ maxWidth: '200px' }} />}
            <button className="btn btn-danger" onClick={() => deleteProduct(product.ProductID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageProducts;

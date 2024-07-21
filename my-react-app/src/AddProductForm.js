import React, { useState } from 'react';

function AddProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      Name: name,
      Description: description,
      Price: parseFloat(price), // Ensure price is parsed as a float for decimal values
      ImageURL: imageURL || null, // Handle if no image URL is provided
    };
    onAddProduct(newProduct);
    // Clear form fields after submission
    setName('');
    setDescription('');
    setPrice('');
    setImageURL('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Image URL:</label>
        <input
          type="text"
          className="form-control"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Product</button>
    </form>
  );
}

export default AddProductForm;

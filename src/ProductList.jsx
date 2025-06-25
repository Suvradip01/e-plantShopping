import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantsArray = [
  {
    name: "Aloe Vera",
    image: "https://example.com/aloe.jpg",
    description: "Medicinal plant good for skin.",
    cost: "$12"
  },
  {
    name: "Lavender",
    image: "https://example.com/lavender.jpg",
    description: "Aromatic plant great for relaxation.",
    cost: "$15"
  }
];

function ProductList() {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div className="product-grid">
      {plantsArray.map((plant, index) => (
        <div key={index} className="product-card">
          <img src={plant.image} alt={plant.name} />
          <h3>{plant.name}</h3>
          <p>{plant.description}</p>
          <p>{plant.cost}</p>
          <button
            onClick={() => handleAddToCart(plant)}
            disabled={!!addedToCart[plant.name]}
          >
            {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

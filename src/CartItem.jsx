import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.cost.substring(1)) * item.quantity;
    }, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-card">
          <img src={item.image} alt={item.name} />
          <h4>{item.name}</h4>
          <p>Price: {item.cost}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Total: ${(parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2)}</p>
          <button onClick={() => handleIncrement(item)}>+</button>
          <button onClick={() => handleDecrement(item)}>-</button>
          <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
        </div>
      ))}
      <h3>Total: ${calculateTotal().toFixed(2)}</h3>
    </div>
  );
}

export default CartItem;

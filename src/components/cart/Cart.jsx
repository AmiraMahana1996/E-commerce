import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../actions/cartActions';


export const Cart = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {items.map(item => (
        <div key={item.id} className="flex justify-between items-center mb-2">
          <div>
            <p>{item.name}</p>
            <p className="text-sm text-gray-600">
              Quantity: {item.quantity} x ${item.price}
            </p>
          </div>
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-4 pt-4 border-t">
        <p className="font-bold">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};
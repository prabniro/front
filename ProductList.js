import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch('http://localhost:5000/products', {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      });
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      console.warn(id);
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'Delete'
      });
      result = await result.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item._id !== itemId);
    setCartItems(updatedCart);
  };

  const checkout = () => {
    // Perform checkout logic (e.g., send order to server, update database, etc.)
    // For simplicity, just clear the cart in this example
    alert('Order placed successfully!');
    setCartItems([]);
  };

  const cancelCheckout = () => {
    // Clear the cart when canceled
    setCartItems([]);
  };

  const searchHandle = async (event) => {
    try {
      let key = event.target.value;
      if (key) {
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if (result) {
          setProducts(result);
        }
      } else {
        getProducts();
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div>
      <div className="product-list">
        <h3>Product List</h3>
        <input
          type="text"
          className="search-product-box"
          placeholder="Search Product"
          onChange={searchHandle}
        />
        <ul>
          <li>S. No.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Image</li>
          <li>Operation</li>
        </ul>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>
                <img
                  src={`data:${item.picture.contentType};base64,${item.picture.data.toString('base64')}`}
                  alt="Product"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </li>
              <li>
                <button onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link to={`/update/${item._id}`}>Update</Link>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Result Found</h1>
        )}
      </div>
      {cartItems.length > 0 && (
        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          checkout={checkout}
          cancelCheckout={cancelCheckout}
        />
      )}
    </div>
  );
};

export default ProductList;

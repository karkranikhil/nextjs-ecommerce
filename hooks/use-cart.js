import { useEffect, useState, createContext, useContext } from 'react';

import { initiateCheckout } from '../lib/payment.js'

// import products from '../products.json';
import { getProductsList } from '../lib/products.js'
const defaultCart = {
  products: {}
}


export const CartContext = createContext(null);


export const useCartState=()=> {
  const [products, setProducts] = useState([])
  useEffect(async()=>{
    const productsList =  await getProductsList()
    setProducts(productsList)
  }, [])


  const [cart, updateCart] = useState(defaultCart);
  useEffect(()=>{
    const stateFromLocal = window.localStorage.getItem('cart')
    const data = stateFromLocal && JSON.parse(stateFromLocal)
    if(data){
      updateCart(data)
    }
  }, [])
  useEffect(()=>{
    const data = JSON.stringify(cart)
    window.localStorage.setItem('cart', data)
  }, [cart])

  const cartItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerUnit: product?.price
    }
  });

  const subtotal = cartItems.reduce((accumulator, { pricePerUnit, quantity }) => {
    return accumulator + ( pricePerUnit * quantity );
  }, 0);

  const quantity = cartItems.reduce((accumulator, { quantity }) => {
    return accumulator + quantity;
  }, 0);

  const addToCart = ({ id }) =>{
    updateCart((prev) => {
      let cart = {...prev};

      if ( cart.products[id] ) {
        cart.products[id].quantity = cart.products[id].quantity + 1;
      } else {
        cart.products[id] = {
          id,
          quantity: 1
        }
      }

      return cart;
    })
  }

  const checkout = () =>{
    initiateCheckout({
      lineItems: cartItems.map(({ id, quantity }) => {
        return {
          price: id,
          quantity
        }
      })
    })
  }
  function updateItem({ id, quantity }) {
    updateCart((prev) => {
      let cart = {...prev};

      if ( cart.products[id] ) {
        cart.products[id].quantity = quantity;
      } else {
        cart.products[id] = {
          id,
          quantity: 1
        }
      }

      return cart;
    })
  }
  return {
    cart,
    subtotal,
    quantity,
    addToCart,
    checkout,
    cartItems,
    updateItem,
    products
  }

}

export const useCart=()=> {
  const cart = useContext(CartContext);
  return cart;
}
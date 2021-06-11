import {useState} from 'react'
import products from '../products.json'
import {initiateCheckout} from '../lib/payment'
const defaultCart = {
    products:{}
  }
export default function useCart(){
    const [cart, updateCart] = useState(defaultCart)
    //adding item to the cart
    const cartItem = Object.keys(cart.products).map(key=>{
        const product = products.find(({id})=> id === key)
        return {
          ...cart.products[key],
          pricePerItem:product.price
        }
      })

     //calculating subTotal
    const subTotal = cartItem.reduce((total, {pricePerItem, quantity})=>{
        return total+(pricePerItem*quantity)
    }, 0)

    //calculating total items
    const totalItems = cartItem.reduce((total, {quantity})=>{
        return total+quantity
    }, 0)

    //adding item to the cart

    const addToCart = ({id}={})=>{
        updateCart(prev=>{
            let cartState={...prev}
            if(cartState.products[id]){
            cartState.products[id].quantity = cartState.products[id].quantity+1
            } else {
            cartState.products[id]={
                id,
                quantity:1
            }
            }
            return cartState
        })
    }

    //checkout functionality
    function checkout(){
        initiateCheckout({  
            lineItems:cartItem.map(item=>({price:item.id, quantity:item.quantity}))
        })
    }

    return {
        cart, updateCart, checkout, addToCart, totalItems, subTotal
    }
}
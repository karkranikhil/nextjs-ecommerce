import {loadStripe} from '@stripe/stripe-js';
export async function initiateCheckout({lineItems}={}){
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)
    const result  = await stripe.redirectToCheckout({
        mode:'payment',
        lineItems,
        successUrl:`${window.location.origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl:window.location.origin
    })
    console.log("check out", result)
}
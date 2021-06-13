import axios from 'axios'
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SK_KEY}` ;
// const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SK_KEY);
export async function getProductsList(){
    // console.log("NEXT_PUBLIC_STRIPE_SK_KEY", process.env.NEXT_PUBLIC_STRIPE_SK_KEY)  
        
    const promise1 = axios.get("https://api.stripe.com/v1/products");
    const promise2 =axios.get("https://api.stripe.com/v1/prices") ;
    return Promise.all([promise1, promise2]).then(function(res) {
      console.log({res})
        const productDetails = res[0].data.data.map(item=>{
            return {
              "productId":item.id,
              "title": item.name,
              "description": item.description,
              "image": item?.images[0],
              "price": null
            }
        })
          const productPrices = res[1].data.data.reduce((obj, item)=>{
              obj[item.product] = {price:item.unit_amount, id:item.id}
              return obj
          }, {})
          const productJson = productDetails.map(item=>{
            return {...item, id:productPrices[item.productId]["id"], price:(productPrices[item.productId]["price"]/100)}
          })
          console.log({productJson})
          return productJson? productJson:[]
        })
      .catch((error) => {
        console.error(error)
      })
    // const products = await stripe.products.list();
    // console.log({products})
    // return products
}       
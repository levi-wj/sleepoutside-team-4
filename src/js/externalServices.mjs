import { convertToJson } from './utils.mjs';

const baseURL = import.meta.env.VITE_SERVER_URL;

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const product = (await convertToJson(response)).Result;

  if (!product) { throw new Error(400); }
  
  return product;
}

export async function postCheckout(checkoutData) {
  checkoutData.orderDate = new Date().toISOString();

  return await fetch(baseURL + 'checkout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(checkoutData),
  }).then(convertToJson);
}
import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { displayBubble } from './cartBubble.mjs';

export function removeProductFromCart(id) {
  let cartItems = getLocalStorage('so-cart') || [];
  setLocalStorage('so-cart', cartItems.filter(item => item.Id !== id));
  displayBubble();
}

export function addProductToCart(product) {
  let cartItems = getLocalStorage('so-cart') || [];
  
  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
  displayBubble();
}
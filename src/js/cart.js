import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { displayBubble } from './cartBubble.mjs';
import { startAnimation } from './utils.mjs';

export function removeProductFromCart(id) {
  let cartItems = getLocalStorage('so-cart') || [];
  setLocalStorage('so-cart', cartItems.filter(item => item.Id !== id));

  const backpack = document.querySelector('.cart');
  startAnimation(backpack, 'shake');
  displayBubble();
}

export function addProductToCart(product) {
  let cartItems = getLocalStorage('so-cart') || [];
  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
  
  const backpack = document.querySelector('.cart');
  startAnimation(backpack, 'jump');
  displayBubble();
}
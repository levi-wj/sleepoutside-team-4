import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { startAnimation } from './utils.mjs';
import { cartCount } from './stores.mjs';

export function removeProductFromCart(id) {
  let cartItems = getLocalStorage('so-cart') || [];
  const backpack = document.querySelector('.cart');

  setLocalStorage('so-cart', cartItems.filter(item => item.Id !== id));
  cartCount.set(getTotalCartItems());
  startAnimation(backpack, 'shake');
}

export function addProductToCart(product) {
  let cartItems = getLocalStorage('so-cart') || [];
  const backpack = document.querySelector('.cart');

  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
  cartCount.set(getTotalCartItems());
  startAnimation(backpack, 'jump');
}

export function getCartTotal() {
  const items = getLocalStorage('so-cart') || [];
  let totalCost = 0;

  items.forEach((item) => (totalCost += item.FinalPrice));
  return totalCost;
}

export function getTotalCartItems() {
  const items = getLocalStorage('so-cart') || [];
  return items.length;
}
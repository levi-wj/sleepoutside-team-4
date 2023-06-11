import { setLocalStorage, getLocalStorage } from './utils.mjs';

export function getWishlistItems() {
  return getLocalStorage('so-wishlist') || [];
}

export function addProductToWishlist(id) {
  let wishlistItems = getWishlistItems();
  wishlistItems.push(id);
  setLocalStorage('so-wishlist', wishlistItems);
}

export function removeProductFromWishlist(id) {
  let wishlistItems = getWishlistItems();
  setLocalStorage('so-wishlist', wishlistItems.filter(item => item !== id));
}
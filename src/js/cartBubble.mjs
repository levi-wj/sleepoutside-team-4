import { getLocalStorage } from './utils.mjs'

// returns number of items in the cart
function getTotalCartItems() {
  const items = getLocalStorage('so-cart') || [];
  return items.length;
}

// hi bubble ! :D
export function displayBubble() {
  const cartItems = getTotalCartItems();
  const bubbleDiv = document.getElementById('bubble');
  // update the current bubble
  if (cartItems > 0) {
    bubbleDiv.style.display = 'block';
    bubbleDiv.innerText = `${cartItems}`;
  } else {
    bubbleDiv.style.display = 'none';
  }
}

displayBubble();
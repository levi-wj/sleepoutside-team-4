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


  product.currentQuantity = 1;
  let match = false;

  //duplicate
  if(cartItems.length === 0){
    cartItems.push(product);
    setLocalStorage('so-cart', cartItems);
  } else{
    for(var i = 0; i < cartItems.length; i++){
      if(product.Id == cartItems[i].Id){
        cartItems[i].currentQuantity++;
        setLocalStorage('so-cart', cartItems);
        match = true;
        const backpack = document.querySelector('.cart');
        startAnimation(backpack, 'jump');

        break;
      } else{
        // eslint-disable-next-line no-console
        console.log(`already matched`)
      }
    }
  }
  if (match == false){
    cartItems.push(product);
    setLocalStorage('so-cart', cartItems);

    const backpack = document.querySelector('.cart');
    startAnimation(backpack, 'jump');
  }
  
  cartCount.set(getTotalCartItems());
}

export function getCartTotal() {
  const items = getLocalStorage('so-cart') || [];
  let totalCost = 0;

  items.forEach((item) => (totalCost += quantityItem(item)));
  return totalCost;
}

export function getTotalCartItems() {
  const items = getLocalStorage('so-cart') || [];
  return items.length;
}

export function quantHandler(event){
  const itemId = event.target.dataset.id;
  const quant = event.target.value;
  const cartItems = getLocalStorage('so=cart') || [];
  const currentProduct = cartItems.find((item) => item.Id == itemId);
  currentProduct.currentQuantity = quant;
  setLocalStorage('so-cart', cartItems);
}

export function quantityItem(event){
  // var quant = countItem()

  var quant = event.target;
  quant = event.currentQuantity;
  // eslint-disable-next-line no-console
  console.log(event);

  return (parseInt(quant) * event.FinalPrice); 
}
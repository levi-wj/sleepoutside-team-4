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
  product.currentQuantity = 1;
  let match = false;
  //duplicate
  if(cartItems.length === 0){
    cartItems.push(product);
    setLocalStorage('so-cart', cartItems);
  }else{
    for (var i = 0; i < cartItems.length; i++){
      if(product.Id == cartItems[i].Id){
        cartItems[i].currentQuantity++;
        setLocalStorage('so-cart', cartItems);
        match = true;
        const backpack = document.querySelector('.cart');
        startAnimation(backpack, 'jump');
        displayBubble();

        break;
      }else{ 

        // eslint-disable-next-line no-console
        console.log(product.currentQuantity);
        // eslint-disable-next-line no-console
        console.log(product);
        // eslint-disable-next-line no-console
        console.log(cartItems[i]);
      
      }
    }
    if (match == false){
      cartItems.push(product);
      setLocalStorage('so-cart', cartItems);

      const backpack = document.querySelector('.cart');
      startAnimation(backpack, 'jump');
      displayBubble();
    }
  }
  

}
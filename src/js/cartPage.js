import { setLocalStorage, getLocalStorage, setClick } from './utils.mjs';
import { removeProductFromCart } from './cart.js';

function setupOnclicks(productList) {
  // Set up onclicks for trash buttons
  productList.querySelectorAll('.fa-trash').forEach(btn => {
    setClick(btn, (e) => {
      removeProductFromCart(e.target.dataset.id);
      renderCartContents();
    });
  });
}

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productList = document.querySelector('.product-list');
  let totalCost = 0; // initialize totalCost to zero

  productList.innerHTML = htmlItems.join('');
  cartItems.forEach((item) => (totalCost) += quantityItem(item));
  const quantityButton = document.querySelectorAll('.cart-card__quantity');
  quantityButton.forEach((item)=>{
    item.addEventListener('change', quantHandler)
  })

  document.querySelector('.cart-footer').innerHTML = `Total: $${totalCost}`;

  if (cartItems.length > 0) {
    const cartFooterElement = document.querySelector('.cart-footer');
    cartFooterElement.classList.remove('hide');
  }
  setupOnclicks(productList);
}

function quantHandler(event){
  const itemId = event.target.dataset.id;
  
  const quant = event.target.value;

  const cartItems = getLocalStorage('so-cart') || [];
  const currentProduct = cartItems.find((item) => item.Id == itemId);

  currentProduct.currentQuantity = quant;
  setLocalStorage('so-cart', cartItems);
  // eslint-disable-next-line no-console
  console.log(currentProduct);
}

function quantityItem(item){
  // var quant = countItem()

  var quant = item.target;
  quant = item.currentQuantity;
  // eslint-disable-next-line no-console
  console.log(item);

  return (parseInt(quant) * item.FinalPrice); 
 }

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>

  <p class="cart-card__quantity">qty: 
      <input id="quantity" value=${item.currentQuantity} type="number" min="0" data-id="${item.Id}" />
  </p>
  <p id="result"></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <i class="fa fa-trash icon-btn cart-card__trash" data-id="${item.Id}"></i>
</li>`;

  return newItem;
}

renderCartContents();
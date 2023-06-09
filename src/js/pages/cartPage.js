import { getLocalStorage, setClick } from '../utils.mjs';
import { removeProductFromCart, getCartTotal } from '../cart.js';
import { renderHeaderFooter } from '../utils.mjs';

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
  const productList = document.querySelector('.cart-list');
  const total = getCartTotal();

  productList.innerHTML = htmlItems.join('');

  document.querySelector('.cart-footer').innerHTML = `Total: $${total}`;
  if (cartItems.length > 0) {
    const cartFooterElement = document.querySelector('.cart-footer');
    cartFooterElement.classList.remove('hide');
    checkoutButton();
  }

  setupOnclicks(productList);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <i class="fa fa-trash icon-btn cart-card__trash" data-id="${item.Id}"></i>
</li>`;

  return newItem;
}

function checkoutButton() {
  let button = document.getElementById('checkoutButton');
  button.innerHTML = '<a href="/checkout/index.html"><button>Continue to Checkout</button></a>';
}

renderHeaderFooter();
renderCartContents();
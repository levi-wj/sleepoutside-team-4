import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

function addProductToCart(product) {
  let cartItems = getLocalStorage('so-cart') || [];
  
  cartItems.push(product);
  setLocalStorage('so-cart', cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

async function productDetailsTemplate(id) {
    const product = await findProductById(id);
    return `
        <h3 id="productName">${product.Name}</h3>
        <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>
        <img id="productImage" class="divider" src="${product.Image}" alt="${product.DescriptionHtmlSimple}" />
        <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
        <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
        <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>`
}

export default async function productDetails(productId, selector) {
    const productHTML = await productDetailsTemplate(productId);
    document.querySelector(selector).innerHTML = productHTML;

    // add listener to Add to Cart button
    document
        .getElementById('addToCart')
        .addEventListener('click', addToCartHandler);
}
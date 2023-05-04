import { findProductById } from './productData.mjs';
import { getParam } from './utils.mjs';

async function createProductDetails(id) {
    const product = await findProductById(id);
    return `<h3 id="productName">${product.Name}</h3>
    <h2 class="divider" id="productNameWithoutBrand">${product.NameWithoutBrand}</h2>
    <img id="productImage" class="divider" src="${product.Image}" alt="${product.DescriptionHtmlSimple}" />
    <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
    <p class="product__color" id="productColorName">${product.Colors[0].ColorName}</p>
    <p class="product__description" id="productDescriptionHtmlSimple">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
    <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>`
}

async function writeToHtml() {
    const productDetails = await createProductDetails(getParam('id'));
    document.querySelector('.product-detail').innerHTML = productDetails;
}

window.addEventListener('load', () => {writeToHtml()});
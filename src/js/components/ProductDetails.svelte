<script>
    import { getParam } from '../utils.mjs';
    import { findProductById } from '../productData.mjs';
    import { addProductToCart } from '../cart.js';
    import { getDiscountPercent } from '../utils.mjs';

    // add to cart button event handler
    async function addToCartHandler(id) {
        const product = await findProductById(id);
        addProductToCart(product);
    }
</script>

{#await findProductById(getParam('id'))}
    <p><i class="fa fa-loading"></i> Loading product details</p>
{:then product} 
    <h3 id="productName">{product.Name}</h3>

    {#if product.ListPrice !== product.FinalPrice}
        <span class="discount">-{getDiscountPercent(product.FinalPrice, product.ListPrice)}%</span>
    {/if}

    <h2 class="divider" id="productNameWithoutBrand">{product.NameWithoutBrand}</h2>
    <img id="productImage" class="divider" src="{product.Image}" alt="{product.Name}" />

    {#if product.ListPrice !== product.FinalPrice}
        <p class="strikethrough" id="productFinalPrice">${product.FinalPrice}</p>
        <p class="product-detail__newprice discount" id="productListPrice">${product.ListPrice}</p>
    {:else}
        <p id="productFinalPrice">${product.FinalPrice}</p>
    {/if}

    <p class="product__color" id="productColorName">{product.Colors[0].ColorName}</p>
    <p class="product__description" id="productDescriptionHtmlSimple">{@html product.DescriptionHtmlSimple}</p>
    <div class="product-detail__add">
        <button id="addToCart" on:click={() => addToCartHandler(product.Id)}>Add to Cart</button>
    </div>
{:catch}
    <p>Product not found</p>
{/await}
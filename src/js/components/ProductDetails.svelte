<script>
    import { getParam, getDiscountPercent } from '../utils.mjs';
    import { findProductById } from '../externalServices.mjs';
    import { addProductToCart } from '../cart.js';
    import Breadcrumbs from './Breadcrumbs.svelte';
    import WishlistStar from './WishlistStar.svelte';

    // add to cart button event handler
    async function addToCartHandler(id) {
        const product = await findProductById(id);
        addProductToCart(product);
    }
</script>

<style>
    .product-detail {
        padding: 1em;
        max-width: 500px;
        margin: auto;
    }

    .product-detail img {
        width: 100%;
    }

    button i {
        margin-right: .5em;
    }

    .flexy {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ebebeb;
        box-shadow: 0px 2px 4px 0px #0000003b;
        padding: .4em 1em .4em 1em;
        border-radius: 10px;
    }
</style>

{#await findProductById(getParam('id'))}
    <p><i class="fa fa-loading"></i> Loading product details</p>
{:then product} 
    <Breadcrumbs crumbs={[
        { text: product.Category, url: `/product-list/index.html?category=${product.Category}` },
        { text: product.Name },
    ]}/>
    <div class="product-detail">
        <h3 id="productName">{product.Name}</h3>

        {#if product.SuggestedRetailPrice !== product.FinalPrice}
            <span class="discount">-{getDiscountPercent(product.SuggestedRetailPrice, product.ListPrice)}%</span>
        {/if}

        <h2 class="divider" id="productNameWithoutBrand">{product.NameWithoutBrand}</h2>
        <picture>
            <source media="(max-width: 480px)" srcset="{product.Images.PrimaryMedium}" />
            <source media="(max-width: 600px)" srcset="{product.Images.PrimaryLarge}" />
            <source media="(min-width: 601px)" srcset="{product.Images.PrimaryExtraLarge}" />
            <img alt="{product.Name}">
        </picture>

        <div class="flexy">
            <div>
                {#if product.SuggestedRetailPrice !== product.FinalPrice}
                    <p class="strikethrough" id="productFinalPrice">${product.SuggestedRetailPrice}</p>
                    <p class="product-detail__newprice discount" id="productListPrice">${product.FinalPrice}</p>
                {:else}
                    <p id="productFinalPrice">${product.FinalPrice}</p>
                {/if}
            </div>
            <WishlistStar productID={product.Id}/>
        </div>

        <p class="product__color" id="productColorName">{product.Colors[0].ColorName}</p>
        <p class="product__description" id="productDescriptionHtmlSimple">{@html product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" on:click={() => addToCartHandler(product.Id)}>
                <i class="fa fa-shopping-cart"></i>Add to Cart
            </button>
        </div>
    </div>
{:catch}
    <p>Product not found</p>
{/await}
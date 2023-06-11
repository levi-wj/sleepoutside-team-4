<script>
    import { getDiscountPercent } from '../utils.mjs';
    import WishlistStar from './WishlistStar.svelte';

    export let product = {};
    export let inWishlist;
</script>

<style>
    .flexy {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

<li class="product-card">
    <section>
        <a href="/product_pages/index.html?id={product.Id}">
            <!--
            {#if product.SuggestedRetailPrice !== product.FinalPrice}
                <span class="product-card__bubble discount">-{getDiscountPercent(product.SuggestedRetailPrice, product.ListPrice)}%</span>
            {/if}
            -->
            <picture>
                <source media="(max-width: 480px)" srcset="{product.Images.PrimarySmall}" />
                <source media="(max-width: 600px)" srcset="{product.Images.PrimaryMedium}" />
                <source media="(min-width: 601px)" srcset="{product.Images.PrimaryLarge}" />
                <img alt="{product.Name}">
            </picture>
            <h3 class="card__brand" id="productFinalPrice">{product.Brand.Name}</h3>
            <h2 class="card__name" id="productFinalPrice">{product.NameWithoutBrand}</h2>
        </a>
        <div class="flexy">
            <div>
                {#if product.SuggestedRetailPrice !== product.FinalPrice}
                    <p class="product-card__price strikethrough" id="productFinalPrice">${product.SuggestedRetailPrice}</p>
                    <p class="product-card__newprice discount" id="productListPrice">${product.FinalPrice}</p>
                {:else}
                    <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
                {/if}
            </div>
            <WishlistStar {inWishlist} productID={product.Id}/>
        </div>
    </section>
</li>
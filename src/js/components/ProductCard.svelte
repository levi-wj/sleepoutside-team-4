<script>
    import { getDiscountPercent } from '../utils.mjs';
    export let product = {};
</script>

<li class="product-card">
    <section>
        <a href="product_pages/index.html?id={product.Id}">
            {#if product.ListPrice !== product.FinalPrice}
                <span class="product-card__bubble discount">-{getDiscountPercent(product.FinalPrice, product.ListPrice)}%</span>
            {/if}
            <img id="productImage" class="divider" src="{product.Image}" alt="{product.Name}" />
            <h3 class="card__brand" id="productFinalPrice">{product.Brand.Name}</h3>
            <h2 class="card__name" id="productFinalPrice">{product.NameWithoutBrand}</h2>
            {#if product.ListPrice !== product.FinalPrice}
                <p class="product-card__price strikethrough" id="productFinalPrice">${product.FinalPrice}</p>
                <p class="product-card__newprice discount" id="productListPrice">${product.ListPrice}</p>
            {:else}
                <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
            {/if}
        </a>
    </section>
</li>
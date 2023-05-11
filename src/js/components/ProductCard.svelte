<script>
    export let product = {};
</script>

<li class="product-card">
    <section>
        <a href="product_pages/index.html?id={product.Id}">
            <img id="productImage" class="divider" src="{product.Image}" alt="{product.Name}" />
            <h3 class="card__brand" id="productFinalPrice">{product.Brand.Name}</h3>
            <h2 class="card__name" id="productFinalPrice">{product.NameWithoutBrand}</h2>
            <p class="product-card__price" id="productFinalPrice">${product.FinalPrice}</p>
        </a>
    </section>
</li>
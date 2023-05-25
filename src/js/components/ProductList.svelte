<script>
    import { getData } from '../productData.mjs';
    import ProductCard from './ProductCard.svelte';

    export let category;

  
    const dataPromise = getData(category);
</script>

{#await dataPromise}
    <p>Loading products...</p>
{:then products}
    <section class="products">
        <ul class="product-list">
            {#each products as product}
                <ProductCard {product}/>
            {/each}
        </ul>
    </section>
{:catch}
    <h2>uh oh broken</h2>
{/await}
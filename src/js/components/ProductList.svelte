<script>
    import { getData } from '../productData.mjs';
    import ProductCard from './ProductCard.svelte';

    export let category;

    const allowList = [
        '880RR',
        '985RF',
        '985PR',
        '344YJ'
    ];
    const dataPromise = getData(category);
</script>

{#await dataPromise}
    <p>Loading products...</p>
{:then products}
    <section class="products">
        <ul class="product-list">
            {#each products as product}
                {#if allowList.includes(product.Id)}
                    <ProductCard {product}/>
                {/if}
            {/each}
        </ul>
    </section>
{:catch}
    <h2>uh oh broken</h2>
{/await}
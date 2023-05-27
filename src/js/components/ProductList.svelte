<script>
  import { getData } from '../productData.mjs';
  import { categories } from '../utils.mjs';
  import ProductCard from './ProductCard.svelte';

  export let category;
  export let query;

  async function getProducts() {
    const products = await getData(category);
    if (query) {
      return searchFilter(products, query);
    } else {
      return products;
    }
  }

  async function searchFilter(products, query) {
    const filteredProducts = products.filter(product => {
      return product.Name.toLowerCase().includes(query.toLowerCase());
    });     
    return filteredProducts;
  }
</script>

<style>
  h2 {
    margin-bottom: -.5em;
  }

  .other-categories {
    font-size: 12pt;
  }

  .other-categories a {
    margin-right: .5em;
    color: var(--primary-color);
  }
</style>

{#await getProducts()}
  <p>Loading products...</p>
{:then products}
  {#if query}
    <h2>Search for '{query}' in {category}</h2>
    <p class="other-categories">Search instead in
      {#each categories as cat}
        {#if category !== cat}
          <a href="/product-list/index.html?category={cat}&q={query}">{cat}</a>
        {/if}
      {/each}
    </p>
  {:else}
    <h2>Top {category}</h2>
    <p class="other-categories">Browse other categories:
      {#each categories as cat}
        {#if category !== cat}
          <a href="/product-list/index.html?category={cat}">{cat}</a>
        {/if}
      {/each}
    </p>
  {/if}

  <section class="products">
    {#if products.length}
        <ul class="product-list">
          {#each products as product}
            <ProductCard {product}/>
          {/each}
        </ul>
    {:else}
      <p>No products found</p>
    {/if}
  </section>
{:catch}
  <h2>uh oh broken</h2>
{/await}
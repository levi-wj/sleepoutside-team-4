<script>
  import { onMount } from 'svelte';
  import { getProductsByCategory } from '../externalServices.mjs';
  import { categories } from '../utils.mjs';
  import ProductCard from './ProductCard.svelte';
  import Breadcrumbs from './Breadcrumbs.svelte';

  export let category;
  export let query;

  let optionSelection;
  let filteredProducts = [];
  let sortedProducts = [];

  async function getProducts() {
    filteredProducts = await getProductsByCategory(category);

    if (query) {
      filteredProducts = searchFilter(filteredProducts, query);
    }

    sortedProducts = filteredProducts;
  }

  function searchFilter(products, query) {
    const filteredProducts = products.filter(product => {
      return product.Name.toLowerCase().includes(query.toLowerCase());
    });     
    return filteredProducts;
  }

  function sortProducts() {
    if (optionSelection === '0') {
      sortedProducts = filteredProducts.sort(function(a, b) {
        let nameA = a.NameWithoutBrand.toLowerCase();
        let nameB = b.NameWithoutBrand.toLowerCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      });
    } else if (optionSelection === '1') {
      sortedProducts = filteredProducts.sort(function(a, b) {
        let nameA = a.NameWithoutBrand.toLowerCase();
        let nameB = b.NameWithoutBrand.toLowerCase();
        return (nameA < nameB) ? 1 : (nameA > nameB) ? -1 : 0;
      });
    } else if (optionSelection === '2') {
      sortedProducts = filteredProducts.sort(function(a, b) {
        let priceA = a.FinalPrice;
        let priceB = b.FinalPrice;
        return priceA - priceB;
      });
    } else if (optionSelection === '3') {
      sortedProducts = filteredProducts.sort(function(a, b) {
        let priceA = a.FinalPrice;
        let priceB = b.FinalPrice;
        return priceB - priceA;
      });
    }
  }

  onMount(getProducts);
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

  .select-div {
    font-size: 12pt;
    font-weight: bold;
    text-align: right;
    margin-top: -2.5em;
    margin-bottom: .5em;
  }

  .select-div select {
    appearance: none;
    background-color: transparent;
    border: 1px solid rgb(170, 170, 170);
    border-radius: 5px;
    padding: .25em;
    margin: 0;
    font-size: inherit;
  }
</style>

<Breadcrumbs crumbs={[
  { text: category, url: `/product-list/index.html?category=${category}` },
  { text: `(${filteredProducts.length} Items)` }
]}/>

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

{#if sortedProducts.length}
  <div class="select-div">
    <label for="sort">Sort by:</label>
    <select bind:value={optionSelection} on:change={sortProducts}>
      <option value="0">a-z</option>
      <option value="1">z-a</option>
      <option value="2">low to high</option>
      <option value="3">high to low</option>
    </select>
  </div>
{/if}

<section class="products">
  {#if sortedProducts.length}
      <ul class="product-list">
        {#each sortedProducts as product}
          <ProductCard {product}/>
        {/each}
      </ul>
  {:else}
    <p>No products found</p>
  {/if}
</section>
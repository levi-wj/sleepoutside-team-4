<script>
  import { addProductToWishlist, removeProductFromWishlist } from '../wishlist.js';
  import { getWishlistItems } from '../wishlist.js';

  // OPTIONAL: Let the parents pass in whether the product is in the wishlist for efficiency
  export let inWishlist;
  export let productID;

  // If they didn't tell us if we're in the wishlist, figure it out ourselves
  if (inWishlist === undefined) {
    inWishlist = getWishlistItems().includes(productID);
  }

  const starClick = () => {
    inWishlist = !inWishlist;
    if (inWishlist) {
      addProductToWishlist(productID);
    } else {
      removeProductFromWishlist(productID);
    }
  }

</script>

<style>
  i {
    cursor: pointer;
    border-radius: 25px;
    padding: .35em;
    border: 1px solid transparent;
  }

  i:hover {
    background-color: #8080803f;
  }

  i.fa-solid {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
  }
</style>

{#if inWishlist}
  <i on:click={starClick} class="fa-solid fa-star" title="Remove from wishlist"></i>
{:else}
  <i on:click={starClick} class="fa-regular fa-star" title="Add to wishlist"></i>
{/if}
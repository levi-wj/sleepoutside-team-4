<script>
  import { getLocalStorage, setClick } from '../utils.mjs';
  import { removeProductFromCart, getCartTotal } from '../cart.js';

  let cartItems = getLocalStorage('so-cart') || [];
  let total = getCartTotal();

  function removeItem(e) {
    // remove items and redraw
    cartItems = removeProductFromCart(e.target.dataset.id);
    total = getCartTotal();
  }
  
</script>

<!-- future reference emma, if it has a list, thats cool, if not LIST -->
{#each cartItems as item}
  <li class="cart-card divider">
    <a href="/product_pages/index.html?id={item.Id}" class="cart-card__image">
      <img
        src="{item.Images.PrimaryMedium}"
        alt="{item.Name}"
      />
    </a>
    <a href="/product_pages/index.html?id={item.Id}">
      <h2 class="card__name">{item.Name}</h2>
    </a>
    <p class="cart-card__color">{item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">${item.FinalPrice}</p>
    <i class="fa fa-trash icon-btn cart-card__trash" data-id="{item.Id}" on:click={removeItem}></i>
  </li>
{/each}

{#if cartItems.length > 0}
  <div class="cart-footer">Total: ${total}</div>
  <a href="/checkout/index.html">
    <button>Continue to Checkout</button>
  </a>
{/if}

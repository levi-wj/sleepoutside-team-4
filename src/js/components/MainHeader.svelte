<script>
    import {cartCount} from '../stores.mjs'
</script>

<div class="logo">
  <img src="/images/tent.svg" alt="Tent logo">
  <a href="/index.html">Sleep<span class="highlight">Outside</span></a>
</div>
<div class="cart">
  <a href="/cart/index.html">
    <img src="/images/backpack.svg" alt="Backpack icon"/>
    {#if $cartCount > 0}
      <div id="bubble">{$cartCount}</div>
    {/if}
  </a>
</div>
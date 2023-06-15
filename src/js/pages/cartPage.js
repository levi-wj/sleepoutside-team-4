import { renderHeaderFooter, getbyid } from '../utils.mjs';
import CartList from '../components/CartList.svelte';

renderHeaderFooter();
new CartList({ target: getbyid('cart-list') });
import ProductList from './components/ProductDetails.svelte';
import { qs } from './utils.mjs';

new ProductList({ target: qs('.product-detail') });
import { qs, renderHeaderFooter } from '../utils.mjs';
import ProductDetails from '../components/ProductDetails.svelte';

renderHeaderFooter();
new ProductDetails({ target: qs('.product-detail') });